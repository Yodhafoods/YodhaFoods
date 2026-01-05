import type { Metadata } from "next";
import MembershipContent from "./_components/MembershipContent";

export const metadata: Metadata = {
    title: "YodhaFam Membership | Join the Inner Circle",
    description: "Join the YodhaFoods Inner Circle for early access, exclusive content, and priority alerts. Sign up for our newsletter to stay updated.",
};

export default function MembershipPage() {
    return <MembershipContent />;
}

