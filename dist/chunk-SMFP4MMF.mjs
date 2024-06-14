import{a as t,b,d as p}from"./chunk-MIGENICT.mjs";var L=["String","Text","Number","Tags"],w=["string","number","array"];function j(e){return e&&e.dataType==="array"&&Array.isArray(e.values)}import{gql as r}from"@apollo/client";import*as n from"@apollo/client";var l={};var g=r`
  fragment TreeDetails on TreeEntry {
    path
    type
  }
`,m=r`
  fragment BlobDetails on Blob {
    oid
    commitUrl
  }
`,A=r`
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
  ${g}
  ${m}
`,R=r`
  mutation createCommit($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: $input) {
      commit {
        oid
      }
    }
  }
`;function k(e){let a=t(t({},l),e);return n.useMutation(R,a)}var q=r`
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
`;var I=r`
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
`;function F(e){let a=t(t({},l),e);return n.useQuery(I,a)}function G(e){let a=t(t({},l),e);return n.useLazyQuery(I,a)}var E=r`
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
`;function H(e){let a=t(t({},l),e);return n.useQuery(E,a)}var P=r`
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
  ${A}
`;function Q(e){let a=t(t({},l),e);return n.useQuery(P,a)}var C=r`
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
`;function W(e){let a=t(t({},l),e);return n.useLazyQuery(C,a)}import{ApolloClient as D,InMemoryCache as x,createHttpLink as U,from as _}from"@apollo/client";import{setContext as f}from"@apollo/client/link/context";import d from"cross-fetch";import{useMemo as T}from"react";var o,v=new x({typePolicies:{}});function h(e=""){return p(this,null,function*(){return(yield d(e+"/api/outstatic/user")).json()})}function B(e,a){let i=U({uri:"https://api.github.com/graphql",fetch:(...y)=>(typeof window!="undefined"&&typeof window.fetch=="function"?window.fetch:d)(...y)}),s=f((pe,ye)=>p(this,[pe,ye],function*(y,{headers:M}){var S;let u=e?{session:e}:yield h(a);return{headers:b(t({},M),{authorization:(S=u.session)!=null&&S.access_token?`Bearer ${u.session.access_token}`:""})}}));return new D({ssrMode:typeof window=="undefined",link:_([s,i]),cache:v})}function O(e=null,a,i=""){let s=o!=null?o:B(a,i);return e&&s.cache.restore(e),typeof window=="undefined"?s:(o=o!=null?o:s,o)}function ae(e=null,a,i){return T(()=>O(e,a,i),[e,a,i])}var c={required:{OST_GITHUB_ID:!1,OST_GITHUB_SECRET:!1},optional:{OST_CONTENT_PATH:!1,OST_REPO_OWNER:!1}},ne=function(){let e={hasMissingEnvVars:!1,envVars:{required:{},optional:{}}};return process.env.OST_REPO_SLUG?c.required.OST_REPO_SLUG=!0:process.env.VERCEL_GIT_REPO_SLUG?c.required.VERCEL_GIT_REPO_SLUG=!0:c.required.OST_REPO_SLUG=!1,Object.entries(c.required).forEach(([a])=>{e.envVars.required[a]=!!process.env[a],process.env[a]||(e.hasMissingEnvVars=!0)}),Object.entries(c.optional).forEach(([a])=>{e.envVars.optional[a]=!!process.env[a]}),e}();var ie="1.4.8";var se="images/",le="api/outstatic/images/";export{k as a,q as b,I as c,F as d,G as e,H as f,Q as g,W as h,O as i,ae as j,ne as k,ie as l,se as m,le as n,L as o,w as p,j as q};
