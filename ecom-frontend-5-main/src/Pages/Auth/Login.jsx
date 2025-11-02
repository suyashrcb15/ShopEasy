import { SignIn } from "@clerk/clerk-react";

export default function Login() {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
            <SignIn routing="path" path="/login" />
        </div>
    );
}
