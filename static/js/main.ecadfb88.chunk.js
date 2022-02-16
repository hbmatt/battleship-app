(this["webpackJsonpbattleship-app"]=this["webpackJsonpbattleship-app"]||[]).push([[0],{12:function(e,t,a){e.exports=a(19)},17:function(e,t,a){},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),i=a.n(c),s=(a(17),a(18),a(5)),o=a(6),l=a(1),u=a(2),p=function e(t){var a=this;Object(l.a)(this,e),this.hit=function(e){a.hits[e-1]=1},this.isSunk=function(){return!!a.hits.every((function(e){return 1===e}))},this.length=t,this.hits=Array(t).fill(0)},h=function(){function e(){var t=this;Object(l.a)(this,e),this.placeShip=function(e,a,n){if(!t.areAllPlaced()&&!t.isAlreadyPlaced(e)){var r=new p(e),c=a[0]-1,i=a[1]-1;if(t.isOffBoard(n,c,i,e)||t.isOccupied(n,c,i,e))return!1;var s=t.ships.length+1;t.ships.push({id:s,ship:r,position:[]});for(var o=0;o<r.length;o++)"horizontal"===n?(t.grid[c+o][i]=s,t.ships[s-1].position.push("".concat(c+o,", ").concat(i))):(t.grid[c][i-o]=s,t.ships[s-1].position.push("".concat(c,", ").concat(i-o)))}},this.autoplaceShips=function(){for(var e=[2,3,3,4,5],a=4;t.ships.length<5;){for(var n=t.getRandCoord(),r=t.getRandDirection(),c=t.placeShip(e[a],n,r);!1===c;)n=t.getRandCoord(),r=t.getRandDirection(),c=t.placeShip(e[a],n,r);a--}},this.resetShips=function(){t.ships=[],t.grid=[];for(var e=0;e<10;e++)t.grid[e]=Array(10).fill(0)},this.receiveAttack=function(e){var a=e[0]-1,n=e[1]-1;if(t.grid[a][n]>0){var r=t.grid[a][n],c=t.ships[r-1].position.indexOf("".concat(a,", ").concat(n));return t.ships[r-1].ship.hit(c+1),t.grid[a][n]="X",r}return t.grid[a][n]="O",!1},this.areAllSunk=function(){return!!t.ships.every((function(e){return!0===e.ship.isSunk()}))},this.grid=[];for(var a=0;a<10;a++)this.grid[a]=Array(10).fill(0);this.ships=[]}return Object(u.a)(e,[{key:"isOffBoard",value:function(e,t,a,n){return!("horizontal"===e&&t+n-1<10||"vertical"===e&&a-n+1>=0)}},{key:"isOccupied",value:function(e,t,a,n){for(var r=0;r<n;r++)if("horizontal"===e){if(0!==this.grid[t+r][a])return!0}else if(0!==this.grid[t][a-r])return!0;return!1}},{key:"areAllPlaced",value:function(){return 5===this.ships.length}},{key:"isAlreadyPlaced",value:function(e){var t=this.ships.reduce((function(t,a){return a.ship.length===e&&t.push(!0),t}),[]);return 3===e?t.length>1:t.length>0}},{key:"getRandCoord",value:function(){return[Math.floor(10*Math.random())+1,Math.floor(10*Math.random())+1]}},{key:"getRandDirection",value:function(){return 0===Math.floor(2*Math.random())?"horizontal":"vertical"}}]),e}(),f=function(){function e(t){var a=this;Object(l.a)(this,e),this.attack=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.getRandCoord();if("computer"===a.name&&!a.isLegal(e))return!1;a.successfulAttack&&a.getAdjacentCoords(),a.attackQueue.length>0&&(e=a.attackQueue[0],a.attackQueue.shift()),a.attacks.push("".concat(e[0]-1,", ").concat(e[1]-1));var t=a.enemy.board.receiveAttack(e);"computer"===a.name&&t?(a.successfulAttack=e,a.attackedShip=a.enemy.board.ships[t-1].ship):a.successfulAttack=null,a.attackedShip&&a.attackedShip.isSunk()&&(a.successfulAttack=null,a.attackQueue=[],a.attackedShip=null)},this.isLegal=function(e){return!a.attacks.find((function(t){return t==="".concat(e[0]-1,", ").concat(e[1]-1)}))},this.name=t,this.enemy="",this.board=new h,this.attacks=[],this.successfulAttack=null,this.attackQueue=[],this.attackedShip=null}return Object(u.a)(e,[{key:"getRandCoord",value:function(){return[Math.floor(10*Math.random())+1,Math.floor(10*Math.random())+1]}},{key:"getAdjacentCoords",value:function(){for(var e=[[-1,0],[0,1],[1,0],[0,-1]],t=0;t<4;t++){var a=this.successfulAttack[0]+e[t][0],n=this.successfulAttack[1]+e[t][1];a>=1&&a<=10&&n>=1&&n<=10&&this.isLegal([a,n])&&this.attackQueue.push([a,n])}}}]),e}(),d=a(9),m=a(4),v=a(3),b=function(e){Object(m.a)(a,e);var t=Object(v.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(e=t.call.apply(t,[this].concat(c))).getClass=function(t){if("computer"===e.props.player.name)switch(t){case"X":return"cell hit";case"O":return"cell miss";default:return e.props.completed?"cell":"cell open"}switch(t){case 1:return"cell carrier";case 2:return"cell battleship";case 3:return"cell destroyer";case 4:return"cell submarine";case 5:return"cell patrol";case"X":return"cell hit";case"O":return"cell miss";default:return"cell"}},e.getText=function(e){switch(e){case"O":return r.a.createElement("i",{className:"fa fa-circle"});default:return""}},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return Object(d.a)(this.props.col).reverse().map((function(t,a){return r.a.createElement("div",{key:"".concat(e.props.colId).concat(10-a),className:e.getClass(t),onClick:e.props.getAttack.bind(e,"".concat(e.props.colId,",").concat(10-a)),onDragEnter:function(t){return"player"===e.props.player.name?e.props.onDragEnter(t,[e.props.colId,10-a]):""}},e.getText(t))}))}}]),a}(n.Component),g=function(e){Object(m.a)(a,e);var t=Object(v.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return Object(d.a)(this.props.player.board.grid).map((function(t,a){return r.a.createElement("div",{key:"column"+a,className:"column"},r.a.createElement(b,{key:"col"+a,col:t,colId:a+1,player:e.props.player,getAttack:e.props.getAttack,completed:e.props.completed,onDragEnter:e.props.onDragEnter,onDragLeave:function(t){return"player"===e.props.player.name?e.props.onDragLeave(t):""}}))}))}}]),a}(n.Component),k=function(e){Object(m.a)(a,e);var t=Object(v.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return this.props.length.map((function(e,t){return r.a.createElement("div",{key:t,className:"block"})}))}}]),a}(n.Component),y=function(e){Object(m.a)(a,e);var t=Object(v.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={lengths:[[0,0,0,0,0],[0,0,0,0],[0,0,0],[0,0,0],[0,0]],direction:"horizontal"},e.rotateShips=function(){var t="horizontal"===e.state.direction?"vertical":"horizontal";e.setState({direction:t})},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"ships "+this.state.direction},this.state.lengths.map((function(t,a){return r.a.createElement("div",{className:"ship "+e.state.direction,key:"class"+a,draggable:!0,onDragStart:function(a){return e.props.onDragStart(a,[t.length,e.state.direction])},onDragEnd:function(t){return e.props.onDragEnd(t)}},r.a.createElement(k,{key:a,id:a,length:t}))}))),r.a.createElement("div",{className:"buttons"},r.a.createElement("button",{onClick:this.rotateShips,title:"Rotate Ships"},r.a.createElement("i",{className:"fa fa-repeat"})),r.a.createElement("button",{onClick:this.props.autoPlace,title:"Autoplace Ships"},r.a.createElement("i",{className:"fa fa-refresh"})),r.a.createElement("button",{onClick:this.props.clearBoard,title:"Remove All Ships"},r.a.createElement("i",{className:"fa fa-remove"}))))}}]),a}(n.Component),O=function(e){Object(m.a)(a,e);var t=Object(v.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={lengths:[[0,0,0,0,0],[0,0,0,0],[0,0,0],[0,0,0],[0,0]]},e.setClass=function(t){return e.props.computer.board.ships[t].ship.isSunk()?"ship horizontal sunk":"ship horizontal"},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"ships scoreboard"},r.a.createElement("h2",null,"Ships Sunk"),this.state.lengths.map((function(t,a){return r.a.createElement("div",{className:e.setClass(a),key:"class"+a},r.a.createElement(k,{key:a,id:a,length:t,direction:e.state.direction}))})))}}]),a}(n.Component),E=function(){var e=Object(n.useState)(new f("player")),t=Object(o.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(new f("computer")),l=Object(o.a)(i,2),u=l[0],p=l[1],h=Object(n.useState)(1),d=Object(o.a)(h,2),m=d[0],v=d[1],b=Object(n.useState)(!1),k=Object(o.a)(b,2),E=k[0],j=k[1],S=Object(n.useState)(null),A=Object(o.a)(S,2),N=A[0],C=A[1],w=Object(n.useState)(!1),D=Object(o.a)(w,2),R=D[0],M=D[1];a.enemy=u,u.enemy=a,u.board.autoplaceShips();var z=function e(){var t=u;if(!1===t.attack())e();else{v(m+2);var a=t.enemy;c(Object(s.a)({},a)),p(Object(s.a)({},t))}P()},P=function(){if(R&&a.board.areAllSunk())C(u.name),j(!0);else{if(!u.board.areAllSunk())return!1;C(a.name),j(!0)}B()},L=function(){c(new f("player")),p(new f("computer")),a.enemy=u,u.enemy=a,u.board.autoplaceShips(),v(1),j(!1),C(null),M(!1)},B=function(){return"computer"===N?r.a.createElement("div",{className:"info"},r.a.createElement("h2",{className:"winner"},"Too bad, the computer won!"),r.a.createElement("button",{onClick:L,title:"Play Again"},r.a.createElement("i",{className:"fa fa-refresh"}))):"player"===N?r.a.createElement("div",{className:"info"},r.a.createElement("h2",{className:"winner"},"Congrats! You've won!"),r.a.createElement("button",{onClick:L,title:"Play Again"},r.a.createElement("i",{className:"fa fa-refresh"}))):void 0},Q=Object(n.useRef)(),I=Object(n.useRef)();return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Battleship"),1===m&&r.a.createElement("div",{className:"info"},r.a.createElement("h2",null,"Place your ships, then click on your enemy's board to start the game!")),B(),r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"ships-wrapper"},r.a.createElement(y,{autoPlace:function(){if(1===m){var e=a;e.board.resetShips(),e.board.autoplaceShips(),c(Object(s.a)({},e)),M(!0)}},clearBoard:function(){if(1===m){var e=a;a.board.resetShips(),c(Object(s.a)({},e)),M(!1)}},onDragStart:function(e,t){R||(Q.current=t)},onDragEnd:function(e){if(!R&&I.current){var t=a;t.board.placeShip(Q.current[0],I.current,Q.current[1]),c(Object(s.a)({},t)),5===a.board.ships.length&&M(!0),Q.current=null,I.current=null}}})),r.a.createElement("div",{className:"board-wrapper"},r.a.createElement("div",{className:"board"},r.a.createElement(g,{player:a,getAttack:function(){},completed:E,onDragEnter:function(e,t){R||(I.current=t,console.log(I.current))},onDragLeave:function(e){I.current=null}})),r.a.createElement("div",{className:"board"},r.a.createElement(g,{player:u,getAttack:function(e){if(R&&m%2!==0&&!N){var t=a;if(e=e.split(","),t.isLegal(e)){t.attack(e);var n=t.enemy;c(Object(s.a)({},t)),p(Object(s.a)({},n)),P(),z()}}},completed:E}))),r.a.createElement("div",{className:"ships-wrapper"},r.a.createElement(O,{computer:u}))))};var j=function(){return r.a.createElement(E,null)};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.ecadfb88.chunk.js.map