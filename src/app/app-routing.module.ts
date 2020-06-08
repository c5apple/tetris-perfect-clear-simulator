import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './top/top.component';
import { PlayComponent } from './play/play.component';
import { ScoreComponent } from './score/score.component';
import { SettingComponent } from './setting/setting.component';


const routes: Routes = [
  { path: '', component: TopComponent },
  { path: 'home', component: TopComponent }, //PWA
  { path: 'play', component: PlayComponent },
  { path: 'play/:tsumo', component: PlayComponent },
  { path: 'score', component: ScoreComponent },
  { path: 'setting', component: SettingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
