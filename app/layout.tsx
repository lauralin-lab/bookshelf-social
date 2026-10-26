import type {Metadata} from 'next';
import './globals.css';
export const viewport={width:'device-width',initialScale:1};
export const metadata:Metadata={title:'Bookshelf Social — Find your intellectual circle',description:'Your bookshelf is your intellectual fingerprint. Discover the people behind the books.',icons:{icon:'/favicon.svg'},openGraph:{title:'Bookshelf Social',description:'Find people who think like you.',images:['/images/shelf-1.jpg']}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
