import { Hono } from 'hono'
import { Octokit } from 'octokit'
import { ProjectDetailsType, ReposSchema, UserDetails } from './types'
import { cors } from 'hono/cors';

type Bindings = {
  GITHUB_TOKEN : string;
  PROJECT_IMAGES : R2Bucket;
}
const app = new Hono<{Bindings : Bindings}>()

app.use(cors({
  origin : ["http://localhost:3000"],
  allowMethods : ['GET', 'OPTIONS'],
  maxAge : 3600 
}))

app.get('/fetchDetails', async (c) => {
  
  const octokit = new Octokit({
    auth: c.env.GITHUB_TOKEN,
  });
  const result = await octokit.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const userData: UserDetails = {
    name: result.data.login,
    avatar_url: result.data.avatar_url,
    html_url: result.data.html_url,
  };

  const userReposResponse = await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const projects: ReposSchema = userReposResponse.data;
  const projectsData : ProjectDetailsType[] = []
  await Promise.all(projects.map(async (proj)=>{
    const imagesKeys : string[] = []
    const project = {
      name : proj.name,
      description : proj.description,
      html_url : proj.html_url,
      live_url : proj.homepage,
      fork : proj.fork,
      imagesKeysList : imagesKeys
    }
    // TODO : add images keys if there is any for the project name so that frontend will call for them
    const imagesList = await (await c.env.PROJECT_IMAGES.list({prefix : proj.name})).objects
    imagesList.map((img)=>{
      imagesKeys.push(img.key)
    })
    project.imagesKeysList = [...project.imagesKeysList, ...imagesKeys]
    
    projectsData.push(project)
  }))
  console.log(userData, " ", projectsData)


  
  return c.json({
    name : "A simple API for the portfolio",
    message : "In case you have landed here you can checkout the portfolio and this api in action at https://portfolio.vercel.com",
    version : "v1",
    userData,
    projectsData,
  });
})
const maxAge = 60 * 60 * 24 * 30;
// Serve static files ( images )
app.get("/fetchStatic/:key/*", async (c)=>{
  const url = c.req.path
  const key = url.split("fetchStatic/")[1]
  console.log(key)
  const imageRes = await c.env.PROJECT_IMAGES.get(key)
  if(!imageRes){
    return c.notFound()
  }
  const image = await imageRes?.arrayBuffer();
  const contentType = imageRes.httpMetadata?.contentType ?? '';
  return c.body(image, 200, {
    "Cache-Control" : `public, max-age=${maxAge}`,
    "Content-Type" : contentType
  })
})

export default app
























// app.get('/', async (c) => {
//   // const reponseData : {
//   //   userDetails : UserDetailsType,
//   //   projects : EditedProjectsType
//   // } = {

//   // }
//   const octokit = new Octokit({
//     auth: c.env.GITHUB_TOKEN,
//   });
//   const result = await octokit.request('GET /user', {
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28',
//     },
//   });
//   // console.log(c.env.GITHUB_TOKEN);// It will print undefined because the variable is stored in .dev.vars as a secret which will not be visible inside the wrangler
//   const userData: UserDetails = {
//     name: result.data.login,
//     avatar_url: result.data.avatar_url,
//     html_url: result.data.html_url,
//   };
//   // console.log(userData)

//   const userReposResponse = await octokit.request('GET /user/repos', {
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28',
//     },
//   });
//   const projects: ReposSchema = userReposResponse.data;
//   const projectsData: ProjectDetailsType[] = [];
//   projects.map((proj) => {
//     const project = {
//       name: proj.name,
//       description: proj.description,
//       html_url: proj.html_url,
//       live_url: proj.homepage,
//       fork: proj.fork,
//     };
//     projectsData.push(project);
//   });
//   console.log(userData, ' ', projectsData);
//   // console.log(userRepos)
//   // const projects = []
//   const finalRepoRes: any = [];
//   await Promise.all(
//     projects.map(async (individualRepo) => {
//       const sRepoRes = await octokit.request(
//         'GET /repos/{owner}/{repo}/contents/{path}',
//         {
//           owner: result.data.login,
//           repo: individualRepo.name,
//           path: '',
//           headers: {
//             'X-GitHub-Api-Version': '2022-11-28',
//           },
//         }
//       );
//       finalRepoRes.push(sRepoRes);
//       console.log('Content retrieve: ', sRepoRes);
//     })
//   );
//   // const images = await octokit.request(
//   //   'GET /repos/{owner}/{repo}/contents/{path}',
//   //   {
//   //     owner: userData.login,
//   //     repo: "Project-Images",
//   //     path: 'Scribe',
//   //     headers: {
//   //       'X-GitHub-Api-Version': '2022-11-28',
//   //     },
//   //   }
//   // );
//   let images: any = [];
//   let imagesList: any = [];
//   try {
//     imagesList = (await c.env.PROJECT_IMAGES.list({ prefix: 'Scribe' }))
//       .objects;
//     // finalRepoRes.push(sRepoRes);
//     // console.log(c.env.project_images)
//     await Promise.all(
//       await imagesList.map(async (img: any) => {
//         const image = await c.env.PROJECT_IMAGES.get(img.key);
//         images.push(image?.key);
//       })
//     );

//     //console.log('Content retrieve: ', images);
//   } catch (error) {
//     console.log(error);
//   }
//   return c.json({
//     userData,
//     projects,
//   });
// });

// export default app;



// Serve static files ( images )
// app.get("/fetchStatic/:key", async (c)=>{
//   const projectName = c.req.param("projectName")
//   // console.log(projectName);
//   await c.env.PROJECT_IMAGES.put("Scribe/img1.png", "value1")
//   const imagesListRes = await (await c.env.PROJECT_IMAGES.list({prefix : `${projectName}`})).objects
//   console.log(imagesListRes)
//   if(imagesListRes.length>0){
//     const images = []
//     await Promise.all(await imagesListRes.map( async (img) => {
//       const image = await c.env.PROJECT_IMAGES.get(img.key)
//       images.push(await image?.arrayBuffer())
//     }));
//     return c.body(images, 200, )
//   }
//   return c.text("hello world")
// })