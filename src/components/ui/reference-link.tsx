function RefrenceLink({ children, ...props }: { children: React.ReactNode }) {
    return (
        <a
            className="text-sm text-indigo-500 underline"
            target="_blank"
            {...props}
        >
            {children}
        </a>
    );
}

export default RefrenceLink;
