export default function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-blue-300 text-base-content p-4 text-center h-[10vh] m-0 ">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Book Shelf Ltd</p>
            </aside>
        </footer>
    )
}