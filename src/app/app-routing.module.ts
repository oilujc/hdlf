import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'chapters', loadChildren: './pages/chapters/chapters.module#ChaptersPageModule' },
  { path: 'subchapters/:id', loadChildren: './pages/subchapters/subchapters.module#SubchaptersPageModule' },
  { path: 'pages/:idc/:ids', loadChildren: './pages/pages/pages.module#PagesPageModule' },
  { path: 'content/:id', loadChildren: './pages/content/content.module#ContentPageModule' },
  { path: 'marks', loadChildren: './pages/marks/marks.module#MarksPageModule' },
  { path: 'section/:slug', loadChildren: './pages/section/section.module#SectionPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
