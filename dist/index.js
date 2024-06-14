"use strict";var le=Object.create;var A=Object.defineProperty,ce=Object.defineProperties,pe=Object.getOwnPropertyDescriptor,ye=Object.getOwnPropertyDescriptors,ue=Object.getOwnPropertyNames,L=Object.getOwnPropertySymbols,Se=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable;var j=(e,a,t)=>a in e?A(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,R=(e,a)=>{for(var t in a||(a={}))V.call(a,t)&&j(e,t,a[t]);if(L)for(var t of L(a))be.call(a,t)&&j(e,t,a[t]);return e},z=(e,a)=>ce(e,ye(a));var Ie=(e,a)=>{for(var t in a)A(e,t,{get:a[t],enumerable:!0})},k=(e,a,t,n)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of ue(a))!V.call(e,r)&&r!==t&&A(e,r,{get:()=>a[r],enumerable:!(n=pe(a,r))||n.enumerable});return e};var E=(e,a,t)=>(t=e!=null?le(Se(e)):{},k(a||!e||!e.__esModule?A(t,"default",{value:e,enumerable:!0}):t,e)),de=e=>k(A({},"__esModule",{value:!0}),e);var o=(e,a,t)=>new Promise((n,r)=>{var i=s=>{try{l(t.next(s))}catch(c){r(c)}},b=s=>{try{l(t.throw(s))}catch(c){r(c)}},l=s=>s.done?n(s.value):Promise.resolve(s.value).then(i,b);l((t=t.apply(e,a)).next())});var ze={};Ie(ze,{Outstatic:()=>De,OutstaticApi:()=>we,customFieldData:()=>je,customFieldTypes:()=>Le,defaultPages:()=>$,isArrayCustomField:()=>Ve});module.exports=de(ze);var p=require("@apollo/client"),x=E(require("@apollo/client"));var Me=p.gql`
  fragment TreeDetails on TreeEntry {
    path
    type
  }
`,ge=p.gql`
  fragment BlobDetails on Blob {
    oid
    commitUrl
  }
`,me=p.gql`
  fragment RecursiveTreeDetails on Tree {
    entries {
      ...TreeDetails
      object {
        ... on Blob {
          ...BlobDetails
        }
        ... on Tree {
          entries {
            ...TreeDetails
            object {
              ... on Blob {
                ...BlobDetails
              }
              ... on Tree {
                entries {
                  ...TreeDetails
                  object {
                    ... on Blob {
                      ...BlobDetails
                    }
                    ... on Tree {
                      entries {
                        ...TreeDetails
                        object {
                          ... on Blob {
                            ...BlobDetails
                          }
                          ... on Tree {
                            entries {
                              ...TreeDetails
                              object {
                                ... on Blob {
                                  ...BlobDetails
                                }
                                ... on Tree {
                                  entries {
                                    ...TreeDetails
                                    object {
                                      ... on Blob {
                                        ...BlobDetails
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${Me}
  ${ge}
`,Ge=p.gql`
  mutation createCommit($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: $input) {
      commit {
        oid
      }
    }
  }
`;var q=p.gql`
  query Collections($owner: String!, $name: String!, $contentPath: String!) {
    repository(owner: $owner, name: $name) {
      id
      object(expression: $contentPath) {
        ... on Tree {
          entries {
            name
            type
          }
        }
      }
    }
  }
`;var He=p.gql`
  query Document($owner: String!, $name: String!, $filePath: String!) {
    repository(owner: $owner, name: $name) {
      id
      object(expression: $filePath) {
        ... on Blob {
          text
          commitUrl
        }
      }
    }
  }
`;var Qe=p.gql`
  query Documents($owner: String!, $name: String!, $contentPath: String!) {
    repository(owner: $owner, name: $name) {
      id
      object(expression: $contentPath) {
        ... on Tree {
          entries {
            name
            object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`;var We=p.gql`
  query GetFileInformation(
    $owner: String!
    $name: String!
    $expression: String!
  ) {
    repository(owner: $owner, name: $name) {
      id
      object(expression: $expression) {
        ... on Tree {
          commitUrl
          ...RecursiveTreeDetails
        }
      }
    }
  }
  ${me}
`;var Ke=p.gql`
  query Oid($owner: String!, $name: String!, $branch: String!) {
    repository(owner: $owner, name: $name) {
      id
      ref(qualifiedName: $branch) {
        target {
          ... on Commit {
            history(first: 1) {
              nodes {
                oid
              }
            }
          }
        }
      }
    }
  }
`;var u=require("@apollo/client"),F=require("@apollo/client/link/context"),U=E(require("cross-fetch")),Ae=require("react");var y,Re=new u.InMemoryCache({typePolicies:{}});function Ee(e=""){return o(this,null,function*(){return(yield(0,U.default)(e+"/api/outstatic/user")).json()})}function Pe(e,a){let t=(0,u.createHttpLink)({uri:"https://api.github.com/graphql",fetch:(...r)=>(typeof window!="undefined"&&typeof window.fetch=="function"?window.fetch:U.default)(...r)}),n=(0,F.setContext)((b,l)=>o(this,[b,l],function*(r,{headers:i}){var m;let s=e?{session:e}:yield Ee(a);return{headers:z(R({},i),{authorization:(m=s.session)!=null&&m.access_token?`Bearer ${s.session.access_token}`:""})}}));return new u.ApolloClient({ssrMode:typeof window=="undefined",link:(0,u.from)([n,t]),cache:Re})}function G(e=null,a,t=""){let n=y!=null?y:Pe(a,t);return e&&n.cache.restore(e),typeof window=="undefined"?n:(y=y!=null?y:n,y)}var d=E(require("@hapi/iron")),W=require("next/headers");var Ce=require("cookie"),H=require("next/headers"),_="ost_token",g=60*60*8;function Q(e){(0,H.cookies)().set(_,e,{maxAge:g,expires:new Date(Date.now()+g*1e3),httpOnly:!0,secure:process.env.NODE_ENV==="production",path:"/",sameSite:"lax"})}var K=process.env.OST_TOKEN_SECRET||"l1f3154n4dv3ntur3st4yS7r0n9s3cr3t";function Y(e){return o(this,null,function*(){let a=R({},e),t=yield d.seal(a,K,d.defaults);Q(t)})}function S(){return o(this,null,function*(){var t;let a=(t=(0,W.cookies)().get("ost_token"))==null?void 0:t.value;if(!a)return null;try{let n=yield d.unseal(a,K,d.defaults),r=n.expires+g*1e3;if(Date.now()>r)throw new Error("Session expired");return n}catch(n){return null}})}var P={required:{OST_GITHUB_ID:!1,OST_GITHUB_SECRET:!1},optional:{OST_CONTENT_PATH:!1,OST_REPO_OWNER:!1}},f=function(){let e={hasMissingEnvVars:!1,envVars:{required:{},optional:{}}};return process.env.OST_REPO_SLUG?P.required.OST_REPO_SLUG=!0:process.env.VERCEL_GIT_REPO_SLUG?P.required.VERCEL_GIT_REPO_SLUG=!0:P.required.OST_REPO_SLUG=!1,Object.entries(P.required).forEach(([a])=>{e.envVars.required[a]=!!process.env[a],process.env[a]||(e.hasMissingEnvVars=!0)}),Object.entries(P.optional).forEach(([a])=>{e.envVars.optional[a]=!!process.env[a]}),e}();var $=["settings","collections"];function De(){return o(this,null,function*(){var n,r,i,b;if(f.hasMissingEnvVars)return{missingEnvVars:f.envVars};let e=yield S(),a=e?G(null,e,process.env.OST_BASE_PATH):null,t=[];if(a)try{let{data:l}=yield a.query({query:q,variables:{name:process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG||"",contentPath:`${process.env.OST_REPO_BRANCH||"main"}:${process.env.OST_MONOREPO_PATH?process.env.OST_MONOREPO_PATH+"/":""}${process.env.OST_CONTENT_PATH||"outstatic/content"}`,owner:process.env.OST_REPO_OWNER||((n=e==null?void 0:e.user)==null?void 0:n.login)||""},fetchPolicy:"no-cache"}),s=(r=l==null?void 0:l.repository)==null?void 0:r.object;(s==null?void 0:s.__typename)==="Tree"&&(t=(i=s==null?void 0:s.entries)==null?void 0:i.map(c=>c.type==="tree"?c.name:void 0).filter(Boolean))}catch(l){console.log({error:l})}return{repoOwner:process.env.OST_REPO_OWNER||((b=e==null?void 0:e.user)==null?void 0:b.login)||"",repoSlug:process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG||"",repoBranch:process.env.OST_REPO_BRANCH||"main",contentPath:process.env.OST_CONTENT_PATH||"outstatic/content",monorepoPath:process.env.OST_MONOREPO_PATH||"",session:e||null,initialApolloState:null,collections:t,pages:[...$,...t],missingEnvVars:!1,hasOpenAIKey:!!process.env.OPENAI_API_KEY,basePath:process.env.OST_BASE_PATH||""}})}var Z=require("next-connect"),J=E(require("next-session")),M=require("next/server");var X=(0,Z.createEdgeRouter)(),xe=(0,J.default)();function T(e){return o(this,null,function*(){return X.run(e,{params:{id:"1"}})})}function Ue(e){return o(this,null,function*(){let t=yield(yield fetch("https://github.com/login/oauth/access_token",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({client_id:process.env.OST_GITHUB_ID,client_secret:process.env.OST_GITHUB_SECRET,code:e})})).text();return new URLSearchParams(t).get("access_token")})}function _e(e){return o(this,null,function*(){return yield(yield fetch("https://api.github.com/user",{headers:{Authorization:"token "+e}})).json()})}function fe(e,a){return o(this,null,function*(){let t=process.env.OST_REPO_OWNER||a,n=process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG||"";return(yield fetch(`https://api.github.com/repos/${t}/${n}`,{headers:{Authorization:`token ${e}`}})).status===200})}function Te(e,a){return o(this,null,function*(){let t=process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG||"";return!(process.env.OST_REPO_OWNER&&(yield fetch(`https://api.github.com/repos/${process.env.OST_REPO_OWNER}/${t}/collaborators/${a}`,{headers:{Authorization:`token ${e}`}})).status!==204)})}X.use((e,a,t)=>o(void 0,null,function*(){yield xe(e,a);let n=yield t();if(n){let r=e.nextUrl.clone();if(r.pathname=(process.env.OST_BASE_PATH||"")+"/outstatic",r.search="",n.status!==200){let i=yield n.json();r.searchParams.set("error",i.error)}return M.NextResponse.redirect(r)}})).get(e=>o(void 0,null,function*(){var c,m;let a=(c=e==null?void 0:e.nextUrl.searchParams)==null?void 0:c.get("error");if(a)return M.NextResponse.json({error:a},{status:403});let t=(m=e==null?void 0:e.nextUrl.searchParams)==null?void 0:m.get("code"),n=yield Ue(t);e.session.token=n;let r=yield _e(n||""),i=Promise.all([fe(e.session.token,r.login),Te(e.session.token,r.login)]),[b,l]=yield i;if(!b)return M.NextResponse.json({error:"repository-not-found"},{status:404,statusText:"Repository not found"});if(!l)return M.NextResponse.json({error:"not-collaborator"},{status:403,statusText:"Forbidden"});if(!r.email){let I=yield(yield fetch("https://api.github.com/user/emails",{headers:{Authorization:`token ${n}`}})).json();if((I==null?void 0:I.length)>0){var s;r.email=(s=I.find(D=>D.primary))===null||s===void 0?void 0:s.email,r.email||(r.email=I[0].email)}}if(r&&n){let{name:I,login:D,email:se,avatar_url:ie}=r;return yield Y({user:{name:I,login:D,email:se,image:ie},access_token:n,expires:new Date(Date.now()+g*1e3)}),new M.NextResponse("ok",{status:200})}else return M.NextResponse.json({error:"something"},{status:403})}));var ee=require("next/navigation");function v(){return o(this,null,function*(){var t,n;let e=["read:user","user:email","repo"],a=new URL("https://github.com/login/oauth/authorize");a.searchParams.append("client_id",(t=process.env.OST_GITHUB_ID)!=null?t:""),a.searchParams.append("scope",e.join(",")),a.searchParams.append("response_type","code"),(n=process.env)!=null&&n.OST_GITHUB_CALLBACK_URL&&a.searchParams.append("redirect_uri",process.env.OST_GITHUB_CALLBACK_URL),(0,ee.redirect)(a.toString())})}var ae=require("next/headers"),te=require("next/server");function h(e){return o(this,null,function*(){(0,ae.cookies)().set(_,"",{maxAge:-1,path:"/"});let a=new URL(process.env.OST_BASE_PATH||"/",e.url);return te.NextResponse.redirect(a)})}var O=require("next/server");function B(){return o(this,null,function*(){try{let e=yield S();return O.NextResponse.json({session:e})}catch(e){return O.NextResponse.json({error:e})}})}var C=require("ai"),re=E(require("openai"));var ve=new re.default({apiKey:process.env.OPENAI_API_KEY||""});function N(e){return o(this,null,function*(){if(!(yield S()))return new Response("Unauthorized",{status:401});let{prompt:t}=yield e.json(),n=yield ve.chat.completions.create({model:"gpt-3.5-turbo",messages:[{role:"system",content:"You are an AI writing assistant that autocompletes existing text based on context from prior text. Give more weight/priority to the later characters than the beginning ones.Limit your response to no more than 200 characters, but make sure to construct complete sentences."},{role:"user",content:t}],temperature:.7,top_p:1,frequency_penalty:0,presence_penalty:0,stream:!0,n:1}),r=(0,C.OpenAIStream)(n);return new C.StreamingTextResponse(r)})}var ne="images/";var he=process.env.OST_REPO_SLUG||process.env.VERCEL_GIT_REPO_SLUG,Oe=process.env.OST_REPO_BRANCH||"main",oe=process.env.OST_MONOREPO_PATH;function w(e,a){return o(this,null,function*(){var r;let t=yield S(),n=process.env.OST_REPO_OWNER||((r=t==null?void 0:t.user)==null?void 0:r.login);if(t!=null&&t.access_token){let i=yield fetch(`https://raw.githubusercontent.com/${n}/${he}/${Oe}/${oe?oe+"/":""}public/${ne}${e.nextUrl.pathname.split("/").pop()}`,{headers:{authorization:`token ${t.access_token}`}});if(i.status===200&&i.body){let l=i.headers.get("Content-Type")==="image/svg+xml"?yield i.blob():Buffer.from(yield i.arrayBuffer());return new Headers(e.headers).set("Cache-Control","max-age=300"),new Response(l,{status:200,headers:{"Cache-Control":"max-age=300"}})}return new Response(i.statusText,{status:i.status})}else return new Response("Unauthorized",{status:401})})}var Be={callback:T,login:v,signout:h,user:B,images:w},Ne={generate:N},we={GET:(t,n)=>o(void 0,[t,n],function*(e,{params:a}){let{ost:r}=a;return Be[r[0]](e)}),POST:(t,n)=>o(void 0,[t,n],function*(e,{params:a}){let{ost:r}=a;return Ne[r[0]](e)})};var Le=["String","Text","Number","Tags"],je=["string","number","array"];function Ve(e){return e&&e.dataType==="array"&&Array.isArray(e.values)}0&&(module.exports={Outstatic,OutstaticApi,customFieldData,customFieldTypes,defaultPages,isArrayCustomField});
