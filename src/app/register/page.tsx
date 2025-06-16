import Container from "../components/Container";

export default function Registerpage(){
    return(
        <Container>
            <div className="register">
                <h1>Register</h1>
                <form>
                    <label>
                        Email:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </Container>
    )
}