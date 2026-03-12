import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { WebClient } from '@slack/web-api';

export default async function Dashboard() {
    const cookieStore = await cookies();
    const hcUserCookie = cookieStore.get('hc_user');

    if (!hcUserCookie?.value) {
        redirect('/auth');
    }

    let user;
    try {
        user = JSON.parse(hcUserCookie.value);
    } catch (e) {
        redirect('/auth');
    }

    const { redis } = await import('@/lib/redis');
    const userId = user._mapped_id || user.id || user.slack_id || user.username;

    let userData = {};
    if (userId) {
        try {
            userData = await redis.hget('user_data', userId) || {};
        } catch (e) {
            console.error('Failed to get redis user_data', e);
        }
    }

    // Default fallback values if identity fields don't exist
    const identityProps = user?.identity || {};
    const note = (identityProps.verification_status || "Unknown") + ", and " + (identityProps.ysws_eligible ? "" : "not ") + "eligible for ysws";

    // ─── SLACK INFO FETCHING ───────────────────────────────────────────────
    let slackProfile = null;
    let slackPresence = null;

    if (identityProps.slack_id && process.env.SLACK_OAUTH_TOKEN) {
        try {
            const slack = new WebClient(process.env.SLACK_OAUTH_TOKEN);
            const [profileRes, presenceRes] = await Promise.all([
                slack.users.profile.get({ user: identityProps.slack_id }),
                slack.users.getPresence({ user: identityProps.slack_id })
            ]);

            if (profileRes.ok) slackProfile = profileRes.profile;
            if (presenceRes.ok) slackPresence = presenceRes.presence;
        } catch (e) {
            console.error('Failed to fetch Slack info:', e);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Welcome, {identityProps.last_name || identityProps.first_name || 'User'}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Manage your profile and integrations here</p>
                    </div>
                    <form action="/api/auth/logout" method="POST" className="mt-4 sm:mt-0">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                            Log Out
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">You and your profile :P</h3>
                            <div className="space-y-3 mt-4 text-sm text-gray-700">
                                <div className='bg-gray-50 p-3 rounded-md border border-gray-200'>
                                    <span className="font-semibold text-gray-900 mr-2">Email:</span>
                                    <a href={`mailto:${identityProps.primary_email}`} className="text-blue-600 hover:text-blue-500 transition-colors">{identityProps.primary_email}</a>
                                </div>
                                <div className='bg-gray-50 p-3 rounded-md border border-gray-200'>
                                    <span className="font-semibold text-gray-900 mr-2">Slack ID:</span>
                                    {identityProps.slack_id || 'Not linked'}
                                </div>
                                <div className='bg-gray-50 p-3 rounded-md border border-gray-200'>
                                    <span className="font-semibold text-gray-900 mr-2">Verification:</span>
                                    {note}
                                </div>
                            </div>
                        </div>

                        {/* Optional raw JSON Viewer space if ever needed */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Configured Preferences (user_data)</h3>
                            <div className="mt-4 overflow-x-auto bg-gray-50 p-4 rounded-md border border-gray-200">
                                <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap break-words">
                                    {JSON.stringify(userData, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area (Slack integration) */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">Your Slack Integration</h3>

                            {identityProps.slack_id ? (
                                slackProfile ? (
                                    <div className="flex flex-col items-center">
                                        <div className="relative mb-5">
                                            <img
                                                src={slackProfile.image_512 || slackProfile.image_192}
                                                alt="Slack Avatar"
                                                className="w-24 h-24 rounded-full border border-gray-200 shadow-sm"
                                            />
                                            {slackPresence === 'active' ? (
                                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" title="Active"></div>
                                            ) : (
                                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-gray-300 rounded-full border-2 border-white" title="Away"></div>
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <p className="text-lg font-medium text-gray-900">{slackProfile.display_name || slackProfile.real_name}</p>
                                            <p className="text-sm text-gray-500 mb-4">{slackProfile.title || 'No Title'}</p>

                                            {slackProfile.status_text && (
                                                <div className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 inline-block">
                                                    <p className="text-sm text-gray-700">
                                                        {slackProfile.status_emoji} {slackProfile.status_text}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                                        <div className="text-gray-400 mb-2">
                                            <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {process.env.SLACK_OAUTH_TOKEN ? "Couldn't retrieve Slack profile." : "Setup SLACK_OAUTH_TOKEN to see info."}
                                        </p>
                                    </div>
                                )
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-gray-500">
                                    <p className="text-sm">No linked Slack ID found.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
