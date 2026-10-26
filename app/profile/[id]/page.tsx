import App from '../../ui';
import {getProfile} from '../../../lib/server';
import {getChatGPTUser} from '../../chatgpt-auth';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=await getProfile(id);return {title:p?`${p.name}’s intellectual fingerprint · Bookshelf Social`:'Private bookshelf',description:p?`${p.books.length} books · ${p.interests.join(' · ')}`:'This bookshelf is not public.',openGraph:p?{images:[`/api/card/${id}`]}:undefined}}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const user=await getChatGPTUser();const p=await getProfile(id,user?.userId);return <App initialProfile={p} unavailable={!p}/>}
