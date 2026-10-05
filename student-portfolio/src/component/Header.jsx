function Header({ title, themeColor}) {
    return (
        <header style={{ backgroundColor: themeColor, padding: "15px" }}>
            <h1>{title}</h1>
        </header>
        
    );
    
}

export default Header;