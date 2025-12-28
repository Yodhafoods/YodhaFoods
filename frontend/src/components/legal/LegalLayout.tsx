type Props = {
    title: string;
    children: React.ReactNode;
};

export default function LegalLayout({ title, children }: Props) {
    return (
        <div className="max-w-4xl flex items-center justify-center flex-col mx-auto px-4 py-12">
            <h1 className="text-3xl text-orange-600 font-bold mb-6">{title}</h1>
            <div className="prose prose-gray max-w-none">{children}</div>
        </div>
    );
}
