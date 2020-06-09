import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './top/top.component';
import { PlayComponent } from './play/play.component';
import { ScoreComponent } from './score/score.component';
import { SettingComponent } from './setting/setting.component';


const routes: Routes = [
  { path: '', component: TopComponent },
  { path: ':lang', component: TopComponent },
  { path: ':lang/home', component: TopComponent }, //PWA
  { path: ':lang/play', component: PlayComponent },
  { path: ':lang/play/:tsumo', component: PlayComponent },
  { path: ':lang/score', component: ScoreComponent },
  { path: ':lang/setting', component: SettingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
