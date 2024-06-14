import{b as w,i as A,k as h,m as k,o as ne,p as ae,q as ie}from"./chunk-SMFP4MMF.mjs";import{a as v,d as n}from"./chunk-MIGENICT.mjs";import*as m from"@hapi/iron";import{cookies as V}from"next/headers";import{parse as me}from"cookie";import{cookies as B}from"next/headers";var R="ost_token",l=60*60*8;function N(e){B().set(R,e,{maxAge:l,expires:new Date(Date.now()+l*1e3),httpOnly:!0,secure:process.env.NODE_ENV==="production",path:"/",sameSite:"lax"})}var C=process.env.OST_TOKEN_SECRET||"l1f3154n4dv3ntur3st4yS7r0n9s3cr3t";function L(e){return n(this,null,function*(){let t=v({},e),s=yield m.seal(t,C,m.defaults);N(s)})}function p(){return n(this,null,function*(){var s;let t=(s=V().get("ost_token"))==null?void 0:s.value;if(!t)return null;try{let r=yield m.unseal(t,C,m.defaults),o=r.expires+l*1e3;if(Date.now()>o)throw new Error("Session expired");return r}catch(r){return null}})}var $=["settings","collections"];function ye(){return n(this,null,function*(){var r,o,a,g;if(h.hasMissingEnvVars)return{missingEnvVars:h.envVars};let e=yield p(),t=e?A(null,e,process.env.OST_BASE_PATH):null,s=[];if(t)try{let{data:c}=yield t.query({query:w,variables:{name:process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG||"",contentPath:`${process.env.OST_REPO_BRANCH||"main"}:${process.env.OST_MONOREPO_PATH?process.env.OST_MONOREPO_PATH+"/":""}${process.env.OST_CONTENT_PATH||"outstatic/content"}`,owner:process.env.OST_REPO_OWNER||((r=e==null?void 0:e.user)==null?void 0:r.login)||""},fetchPolicy:"no-cache"}),i=(o=c==null?void 0:c.repository)==null?void 0:o.object;(i==null?void 0:i.__typename)==="Tree"&&(s=(a=i==null?void 0:i.entries)==null?void 0:a.map(_=>_.type==="tree"?_.name:void 0).filter(Boolean))}catch(c){console.log({error:c})}return{repoOwner:process.env.OST_REPO_OWNER||((g=e==null?void 0:e.user)==null?void 0:g.login)||"",repoSlug:process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG||"",repoBranch:process.env.OST_REPO_BRANCH||"main",contentPath:process.env.OST_CONTENT_PATH||"outstatic/content",monorepoPath:process.env.OST_MONOREPO_PATH||"",session:e||null,initialApolloState:null,collections:s,pages:[...$,...s],missingEnvVars:!1,hasOpenAIKey:!!process.env.OPENAI_API_KEY,basePath:process.env.OST_BASE_PATH||""}})}import{createEdgeRouter as q}from"next-connect";import D from"next-session";import{NextResponse as f}from"next/server";var G=q(),M=D();function S(e){return n(this,null,function*(){return G.run(e,{params:{id:"1"}})})}function j(e){return n(this,null,function*(){let s=yield(yield fetch("https://github.com/login/oauth/access_token",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({client_id:process.env.OST_GITHUB_ID,client_secret:process.env.OST_GITHUB_SECRET,code:e})})).text();return new URLSearchParams(s).get("access_token")})}function K(e){return n(this,null,function*(){return yield(yield fetch("https://api.github.com/user",{headers:{Authorization:"token "+e}})).json()})}function z(e,t){return n(this,null,function*(){let s=process.env.OST_REPO_OWNER||t,r=process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG||"";return(yield fetch(`https://api.github.com/repos/${s}/${r}`,{headers:{Authorization:`token ${e}`}})).status===200})}function W(e,t){return n(this,null,function*(){let s=process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG||"";return!(process.env.OST_REPO_OWNER&&(yield fetch(`https://api.github.com/repos/${process.env.OST_REPO_OWNER}/${s}/collaborators/${t}`,{headers:{Authorization:`token ${e}`}})).status!==204)})}G.use((e,t,s)=>n(void 0,null,function*(){yield M(e,t);let r=yield s();if(r){let o=e.nextUrl.clone();if(o.pathname=(process.env.OST_BASE_PATH||"")+"/outstatic",o.search="",r.status!==200){let a=yield r.json();o.searchParams.set("error",a.error)}return f.redirect(o)}})).get(e=>n(void 0,null,function*(){var _,y;let t=(_=e==null?void 0:e.nextUrl.searchParams)==null?void 0:_.get("error");if(t)return f.json({error:t},{status:403});let s=(y=e==null?void 0:e.nextUrl.searchParams)==null?void 0:y.get("code"),r=yield j(s);e.session.token=r;let o=yield K(r||""),a=Promise.all([z(e.session.token,o.login),W(e.session.token,o.login)]),[g,c]=yield a;if(!g)return f.json({error:"repository-not-found"},{status:404,statusText:"Repository not found"});if(!c)return f.json({error:"not-collaborator"},{status:403,statusText:"Forbidden"});if(!o.email){let u=yield(yield fetch("https://api.github.com/user/emails",{headers:{Authorization:`token ${r}`}})).json();if((u==null?void 0:u.length)>0){var i;o.email=(i=u.find(O=>O.primary))===null||i===void 0?void 0:i.email,o.email||(o.email=u[0].email)}}if(o&&r){let{name:u,login:O,email:I,avatar_url:H}=o;return yield L({user:{name:u,login:O,email:I,image:H},access_token:r,expires:new Date(Date.now()+l*1e3)}),new f("ok",{status:200})}else return f.json({error:"something"},{status:403})}));import{redirect as X}from"next/navigation";function T(){return n(this,null,function*(){var s,r;let e=["read:user","user:email","repo"],t=new URL("https://github.com/login/oauth/authorize");t.searchParams.append("client_id",(s=process.env.OST_GITHUB_ID)!=null?s:""),t.searchParams.append("scope",e.join(",")),t.searchParams.append("response_type","code"),(r=process.env)!=null&&r.OST_GITHUB_CALLBACK_URL&&t.searchParams.append("redirect_uri",process.env.OST_GITHUB_CALLBACK_URL),X(t.toString())})}import{cookies as Y}from"next/headers";import{NextResponse as F}from"next/server";function E(e){return n(this,null,function*(){Y().set(R,"",{maxAge:-1,path:"/"});let t=new URL(process.env.OST_BASE_PATH||"/",e.url);return F.redirect(t)})}import{NextResponse as b}from"next/server";function P(){return n(this,null,function*(){try{let e=yield p();return b.json({session:e})}catch(e){return b.json({error:e})}})}import{OpenAIStream as J,StreamingTextResponse as Q}from"ai";import Z from"openai";var ee=new Z({apiKey:process.env.OPENAI_API_KEY||""});function x(e){return n(this,null,function*(){if(!(yield p()))return new Response("Unauthorized",{status:401});let{prompt:s}=yield e.json(),r=yield ee.chat.completions.create({model:"gpt-3.5-turbo",messages:[{role:"system",content:"You are an AI writing assistant that autocompletes existing text based on context from prior text. Give more weight/priority to the later characters than the beginning ones.Limit your response to no more than 200 characters, but make sure to construct complete sentences."},{role:"user",content:s}],temperature:.7,top_p:1,frequency_penalty:0,presence_penalty:0,stream:!0,n:1}),o=J(r);return new Q(o)})}var te=process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG,se=process.env.OST_REPO_BRANCH||"main",U=process.env.OST_MONOREPO_PATH;function d(e,t){return n(this,null,function*(){var o;let s=yield p(),r=process.env.OST_REPO_OWNER||((o=s==null?void 0:s.user)==null?void 0:o.login);if(s!=null&&s.access_token){let a=yield fetch(`https://raw.githubusercontent.com/${r}/${te}/${se}/${U?U+"/":""}public/${k}${e.nextUrl.pathname.split("/").pop()}`,{headers:{authorization:`token ${s.access_token}`}});if(a.status===200&&a.body){let c=a.headers.get("Content-Type")==="image/svg+xml"?yield a.blob():Buffer.from(yield a.arrayBuffer());return new Headers(e.headers).set("Cache-Control","max-age=300"),new Response(c,{status:200,headers:{"Cache-Control":"max-age=300"}})}return new Response(a.statusText,{status:a.status})}else return new Response("Unauthorized",{status:401})})}var oe={callback:S,login:T,signout:E,user:P,images:d},re={generate:x},ut={GET:(s,r)=>n(void 0,[s,r],function*(e,{params:t}){let{ost:o}=t;return oe[o[0]](e)}),POST:(s,r)=>n(void 0,[s,r],function*(e,{params:t}){let{ost:o}=t;return re[o[0]](e)})};export{ye as Outstatic,ut as OutstaticApi,ae as customFieldData,ne as customFieldTypes,$ as defaultPages,ie as isArrayCustomField};