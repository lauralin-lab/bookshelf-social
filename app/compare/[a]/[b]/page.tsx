import App from '../../../ui';
import {getProfile} from '../../../../lib/server';
import {getChatGPTUser} from '../../../chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{a:string;b:string}>}){const {a,b}=await params;const user=await getChatGPTUser();const [left,right]=await Promise.all([getProfile(a,user?.userId),getProfile(b,user?.userId)]);return <App initialProfile={right} initialLeft={left} unavailable={!left||!right}/>}
