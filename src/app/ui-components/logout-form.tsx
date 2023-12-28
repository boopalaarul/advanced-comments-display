export default function LogoutForm() {
    return (
        <div className="section flex flex-row space-x-3">
            <h2>Stay a while-- but if you're ready to go, make sure to</h2>
            <form action="/api/logout" method="POST">
                <input type="submit" value="Log Out" className="button" />
            </form>
        </div>
    );
}