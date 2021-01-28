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

function loop(){
    
    flappybird.atualiza();

    planoDeFundo.desenha()
    chao.desenha();
    flappybird.desenha();



    requestAnimationFrame(loop);
}

loop();