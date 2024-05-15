import { NavLink } from 'react-router-dom';

type NavItem = {
    name: string;
    href: string;
  };
  
  type HeaderProps = {
    children?: React.ReactNode;
  }
  
const nav: NavItem[] = [
  {name: 'Home' , href: '/'},
    {name: 'Search' ,href: '/Search'},
    {name: 'Portfolio' , href: '/Portfolio'},
    
];
function Header(props:HeaderProps){
  
    return(
        <>
    <div className="flex justify-end bg-white-800 h-16 border-b-2">
                    {nav.map((item: NavItem) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                       
                        className = { ({isActive}) =>{
                            return ' px-9 py-4 font-large text-black-200 ' +
                            (isActive ? 'text-black-200' :
                            ' text-gray-400')
                        }

                        }
                    
                      >
                        {item.name}
                      </NavLink>
                    ))}
                 
                  </div>
                  {props.children}
            
         
                  </>
    );

}
export default Header;