
  
  import Link from "next/link";

  const links = [
    {
      label: "Home",
      route: "/",
    },
    {
      label: "About",
      route: "/about", // Cambiado a minúsculas para coincidir con la ruta
    },
  ];
  
  export default function RootLayout({ children }) {
    return (
      <>
        <head>
          <title>mi primera pagina con next13</title>
        </head>
        <body>
          <nav>
            <ul>
              {links.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {children}
        </body>
      </>
    );
  }
  
