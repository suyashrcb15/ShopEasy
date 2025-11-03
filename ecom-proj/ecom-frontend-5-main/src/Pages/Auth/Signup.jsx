import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
            <SignUp routing="path" path="/signup" />
        </div>
    );
}
