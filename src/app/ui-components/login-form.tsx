export default function LoginForm() {
    return (
        <div className="section">
            <h2>Want to join the conversation?</h2>
            <form action="/api/login" method="POST" className="flex flex-row space-x-5">
                <label htmlFor="username-id">Username:</label>
                <input type="text" id="username-id" name="username" />

                <label htmlFor="password-id">Password:</label>
                <input type="password" id="password-id" name="password" />

                <input type="submit" value="Sign In" className="button" />
            </form>
        </div>
    );
}