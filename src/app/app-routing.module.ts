import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'category', pathMatch: 'full' },
   { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'usergalary', loadChildren: './usergalary/usergalary.module#UsergalaryPageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'categoryimages', loadChildren: './categoryimages/categoryimages.module#CategoryimagesPageModule' },
  { path: 'image', loadChildren: './image/image.module#ImagePageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
