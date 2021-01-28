console.log('Flappy Bird');

const sprites = new Image();

sprites.src = './sprites.png';

const canvas = document.querySelector('canvas'); 
const contexto = canvas.getContext('2d');

// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY, 
            this.largura , this.altura, 
            this.x, this.y, 
            this.largura , this.altura, 
        );
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY, 
            this.largura , this.altura, 
            (this.x + this.altura), this.y, 
            this.largura , this.altura, 
        );
    }
}
// [Chão]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha(){
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY, 
            this.largura , this.altura, 
            this.x, this.y, 
            this.largura , this.altura, 
        );
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY, 
            this.largura , this.altura, 
            (this.x + this.altura), this.y, 
            this.largura , this.altura, 
        );
    }
}

const flappybird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,

    gravidade: 0.25,
    velocidade : 0,

    atualiza(){
        this.velocidade = this.velocidade + this.gravidade;
        this.y = this.y + this.velocidade;

        console.log(this.velocidade);

    },

    desenha(){
        contexto.drawImage(
            sprites,
            flappybird.spriteX, flappybird.spriteY, // Sprite X ,Sprite Y
            flappybird.largura , flappybird.altura, // Tamnho do recorta da sprite
            flappybird.x, flappybird.y, // posição no canvas
            flappybird.largura , flappybird.altura, //tamanho no canvas
        );

    }
}

// [mensagemGetReady]
const mensagemGetReady = {
    sx: 134, 
    sy: 0,
    w: 174, 
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            this.sx, this.sy,
            this.w, this.h,
            this.x, this.y,
            this.w, this.h,

        );
    }
}

//
// [Telas]
//
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;

}

const Telas = {
    INICIO : {
        desenha(){
            planoDeFundo.desenha()
            chao.desenha();
            flappybird.desenha();
            mensagemGetReady.desenha();
        }, 
        click(){
            mudaParaTela(Telas.JOGO);

        },
        atualiza(){

        }
    }
};

Telas.JOGO = {
    desenha(){

        planoDeFundo.desenha()
        chao.desenha();
        flappybird.desenha();
    },
    atualiza(){
        flappybird.atualiza();
    }
};

function loop(){
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click' , function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});
mudaParaTela(Telas.INICIO);
loop();