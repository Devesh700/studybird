import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  "How does moderation work?",
  "How can a child submit content?",
  "How do parents control permissions?",
  "How do mentors connect with children safely?",
];

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-cyan-50 to-indigo-50 p-6 md:p-8">
        <Badge className="mb-3 bg-emerald-700 text-white hover:bg-emerald-800">Support</Badge>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Help, privacy, and safety resources.</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-700 md:text-base">
          Find answers quickly, contact our team, and review privacy and safety commitments built for children and families.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Help & FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            {faqs.map((faq) => (
              <p key={faq}>- {faq}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>Email: support@storybird.example</p>
            <p>Parent helpdesk hours: Mon to Sat, 9 AM to 6 PM</p>
            <p>Response target: within 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy & Safety Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            We apply age-aware moderation, secure data handling, and transparent parent visibility for child activities.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            Platform usage is governed by child safety standards, responsible participation rules, and content integrity guidelines.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
