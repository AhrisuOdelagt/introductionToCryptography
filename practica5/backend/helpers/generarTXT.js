import crypto from 'crypto';

const generarTXT = async (res, username, key) => {
    // Decodificación de la llave
    const priv = key;
    console.log(priv);

    // Crear contenido para el PDF con formato
    const contenido = `
        Documento importante de ${username}:
        Hi, my name is (what?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (huh?)
        My name is (what?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (what?)
        (Excuse me) My name is (who?)
        My name is (chka-chka, Slim Shady)
        Can I have the attention of the class for one second?)
        Hi, my name is (huh?)
        My name is (what?)
        My name is (chka-chka, Slim Shady)
        Hi, kids, do you like violence? (Yeah, yeah, yeah)
        Wanna see me stick nine-inch nails, through each one of my eyelids? (Uh-huh)
        Wanna copy me and do exactly like I did? (Yeah, yeah)
        Try 'cid and get fucked up worse that my life is? (Huh?)
        My brain's dead weight, I'm tryna get my head straight
        But I can't figure out which Spice Girl I want to impregnate (oh)
        And Dr. Dre said, "Slim Shady you a base-head" (uh-uh)
        "So why's your face red? Man, you wasted"
        Well, since age twelve, I've felt like I'm someone else
        'Cause I hung my original self from the top bunk with a belt
        Got pissed off and ripped Pamela Lee's tits off
        And smacked her so hard I knocked her clothes backwards like Kris Kross
        I smoke a fat pound of grass and fall on my ass
        Faster than a fat bitch who sat down too fast
        Come here, slut, "Shady, wait a minute, that's my girl, dawg"
        I don't give a fuck, God sent me to piss the world off
        Hi, my name is (what?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (huh?)
        My name is (what?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (what?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (huh?)
        My name is (what?)
        My name is (chka-chka, Slim Shady)
        My English teacher wanted to flunk me in junior high (shh)
        Thanks a lot, next semester I'll be thirty five
        I smacked him in his face with an eraser
        Chased him with a stapler
        Stapled his nuts to a stack of papers (ow)
        Walked in the strip club, had my jacket zipped up
        Flashed the bartender, then stuck my dick in the tip cup
        Extraterrestrial, running over pedestrians in a spaceship
        While they screamin' at me, "Let's just be friends"
        Ninety-nine percent of my life I was lied to
        I just found out my mom does more dope than I do (damn)
        I told her I'd grow up to be a famous rapper
        Make a record about doin' drugs and name it after her (oh, thank you)
        You know you blew up when the women rush your stands
        Try to touch your hands like some screamin' Usher fans (ah)
        This guy at White Castle asked for my autograph (dude, can I get your autograph?)
        So I signed it, "Dear Dave, thanks for the support, asshole"
        Hi, my name is (huh?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (what?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (huh?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (what?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
        Stop the tape, this kid needs to be locked away (get him)
        Dr. Dre, don't just stand there, operate
        I'm not ready to leave, it's too scary to die (fuck that)
        I'll have to be carried inside the cemetery and buried alive (ha, yup)
        Am I comin' or goin'? I can barely decide
        I just drank a fifth of vodka, dare me to drive? (Go ahead)
        All my life I was very deprived
        I ain't had a woman in years, and my palms are too hairy to hide (whoops)
        Clothes ripped like the Incredible Hulk
        I spit when I talk, I'll fuck anything that walks (come here)
        When I was little I used to get so hungry I would throw fits
        How you gonna breast feed me, mom? You ain't got not tits
        I lay awake and strap myself in the bed
        With a bulletproof vest on and shoot myself in the head (bang)
        'Cause I'm steamin' mad (grr)
        And by the way, when you see my dad (yeah?)
        Tell him that I slit his throat in this dream I had
        Hi, my name is (what?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (huh?)
        My name is (what?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (who?)
        My name is (huh?)
        My name is (chka-chka, Slim Shady)
        Hi, my name is (huh?)
        My name is (who?)
        My name is (chka-chka, Slim Shady)
    `;
    const contenidoLimpio = contenido.replace(/\n\s+/g, '\n');

    // Aplicamos un hash al contenido del PDF
    const hash = crypto.createHash('sha256');
    hash.update(contenidoLimpio.trim());
    const digest = hash.digest('base64');
    console.log(digest);

    // Firmamos con la llave privada del usuario
    const privateKeyBuffer = Buffer.from(priv, 'base64');
    const signature = crypto.sign('RSA-SHA256', Buffer.from(contenidoLimpio.trim()), privateKeyBuffer);
    console.log(signature.toString('base64'))

    // Colocamos la firma dentro del archivo
    const firma = `Documento firmado por ${username} con la firma: ${signature.toString('base64')}`;
    const full = `${contenidoLimpio.trim()}\n\n${firma}`;

    // Generamos el .txt
    console.log("\n" + full)
    res.status(200).send(full);
};

export default generarTXT;
