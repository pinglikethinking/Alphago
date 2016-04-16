
var me=true;
var over=false;
var count=0;
var chessBoard=[];
var wins=[];/*定义赢法数组的一维*/
var myWin=[];/*定义我方落子的统计数组*/
var computerWin=[];/*定义计算机落子的统计数组*/
/*
初始化落子数组，二维坐标数组
 */
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
	}
}
/*
初始化赢法数组，三维数组
 */
for(var i=0;i<15;i++){
	wins[i]=[];/*初始化二维*/
	for(var j=0;j<15;j++){
		wins[i][j]=[];/*初始化三维*/
	}
}
/*
第一类赢法：竖线
 */
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
/*
第二类赢法：横线
 */
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
/*
第三类赢法：斜线
 */
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
/*
第四类赢法：反斜线
 */
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
/*
初始化统计数组
 */
for(var i=0;i<count;i++){
	myWin[i]=0;
	computerWin[i]=0;
}
/*
画棋盘
 */
var chess= document.getElementById('chess');
var context=chess.getContext('2d');

var logo=new Image();
logo.src="img/logo.jpg";
logo.onload=function(){
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();	
};

context.strokeStyle="#BFBFBF";
function drawChessBoard(){
for(var i=0;i<15;i++){
	context.moveTo(15+i*30,15);
    context.lineTo(15+i*30,435);
    context.stroke();
    context.moveTo(15,15+i*30);
    context.lineTo(435,15+i*30);
    context.stroke();
}
}
/*
画棋子
 */
function oneStep(i,j,me){
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
	    gradient.addColorStop(1,"#636766");
	}
	else{
		gradient.addColorStop(0,"#D1D1D1");
	    gradient.addColorStop(1,"#F9F9F9");
	}
	
	context.fillStyle=gradient;
	context.fill();
}
/*
落棋子
 */
chess.onclick=function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(chessBoard[i][j]===0){
		oneStep(i,j,me);
	chessBoard[i][j]=1;
	/*
	赢法的统计数组
	 */
	for(var k=0;k<count;k++){
		if(wins[i][j][k]){
			myWin[k]++;
			computerWin[k]=6;
			if(myWin[k]===5){
				alert(" Good! You Win!");
				over=true;
			}
		}
	}
	if(!over){
		me=!me;
		computerAI();
	}
	}
};

function computerAI(){
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	/*
	初始化棋盘上每一个点的分数数组，二维
	 */
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	/*
	遍历棋盘
	 */
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j]===0){
				/*
				每个点落子的分数计算
				 */
				for(var k=0;k<count;k++){
					if(wins[i][j][k]){
						/*我方落子得分计算*/
						if(myWin[k]===1){
							myScore[i][j]+=200;
						}else if(myWin[k]===2){
							myScore[i][j]+=400;
						}else if(myWin[k]===3){
							myScore[i][j]+=2000;
						}else if(myWin[k]===4){
							myScore[i][j]+=10000;
						}
                        /*计算机落子得分计算*/
						if(computerWin[k]===1){
							computerScore[i][j]+=220;
						}else if(computerWin[k]===2){
							computerScore[i][j]+=420;
						}else if(computerWin[k]===3){
							computerScore[i][j]+=2200;
						}else if(computerWin[k]===4){
							computerScore[i][j]+=20000;
						}
					}
				}
				/*
				找出落子分数最高的点，计算机落子(u,v)
				 */
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]===max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}

				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]===max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v]=2;
	/*
	赢法统计数组的更新
	 */
	for(var k=0;k<count;k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k]=6;
			if(computerWin[k]===5){
				alert(" come on! Once again!");
				over=true;
			}
		}
	}
	if(!over){
		me=!me;
	}
}