import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

const POSTS_DATABASE = [
  // VOLUMEN I: EL ALGORITMO SOCIAL
  {
    chapter: "01-vecina",
    title: "La Vecina y el Algoritmo",
    quote: "La curiosidad no nació en un laboratorio de silicio; nació en la sabana cuando necesitamos predecir qué harían los demás.",
  },
  {
    chapter: "01-vecina",
    title: "La Vecina y el Algoritmo",
    quote: "Antes de los buscadores web, el motor de inferencia social más eficiente era la atención observadora del vecino.",
  },
  {
    chapter: "02-el-algoritmo-social-primitivo",
    title: "El Algoritmo Social Primitivo",
    quote: "El chisme no fue una falla moral de la tribu, sino el primer algoritmo distribuido para medir la reputación y reducir la incertidumbre.",
  },
  {
    chapter: "02-el-algoritmo-social-primitivo",
    title: "El Algoritmo Social Primitivo",
    quote: "Las pinturas rupestres no eran adorno: eran bases de datos estáticas para inmortalizar el conocimiento del grupo.",
  },
  {
    chapter: "02-el-algoritmo-social-primitivo",
    title: "El Algoritmo Social Primitivo",
    quote: "Saber quién es confiable y quién no fue la primera metadato que la humanidad necesitó procesar para sobrevivir.",
  },
  {
    chapter: "03-la-busqueda-de-la-verdad-fija",
    title: "La Búsqueda de la Verdad Fija",
    quote: "La escritura cuneiforme en Mesopotamia formalizó el chisme económico: convirtió la palabra volátil en registro permanente.",
  },
  {
    chapter: "03-la-busqueda-de-la-verdad-fija",
    title: "La Búsqueda de la Verdad Fija",
    quote: "Inventamos la lógica para sostener la ilusión de que el mundo puede fijarse en reglas inmutables.",
  },
  {
    chapter: "04-medir-lo-invisible",
    title: "Medir lo Invisible",
    quote: "El microscopio y la estadística nacieron del mismo impulso: ampliar nuestra capacidad de percibir patrones invisibles a simple vista.",
  },
  {
    chapter: "04-medir-lo-invisible",
    title: "Medir lo Invisible",
    quote: "Cuando el mundo se volvió demasiado amplio para el chisme local, creamos las ciencias sociales para procesar a las masas.",
  },
  {
    chapter: "05-el-gran-espejo-digital",
    title: "El Gran Espejo Digital",
    quote: "La Inteligencia Artificial no es alienígena: es la propia curiosidad humana empaquetada en matrices de correlación estadística.",
  },
  {
    chapter: "05-el-gran-espejo-digital",
    title: "El Gran Espejo Digital",
    quote: "El Big Data es la sabana africana expandida a escala planetaria, donde cada clic es un rastro de comportamiento.",
  },
  {
    chapter: "05-el-gran-espejo-digital",
    title: "El Gran Espejo Digital",
    quote: "Los LLMs no inventaron el lenguaje; simplemente aprendieron a navegar el océano de textos que dejamos como rastro.",
  },
  {
    chapter: "06-la-ventana-infinita",
    title: "La Ventana Infinita",
    quote: "En la economía de la atención, el algoritmo no busca educarte: busca mantenerte cerca del fuego digital.",
  },
  {
    chapter: "06-la-ventana-infinita",
    title: "La Ventana Infinita",
    quote: "La sobreabundancia de datos no elimina la incertidumbre; a menudo solo construye jaulas de resonancia más sofisticadas.",
  },

  // INTERLUDIO
  {
    chapter: "la-cueva-virtual",
    title: "La Cueva Virtual (Manifiesto)",
    quote: "Nos reunimos alrededor del nuevo fuego digital de silicio con las mismas preguntas que teníamos frente a la fogata en la sabana.",
  },
  {
    chapter: "la-cueva-virtual",
    title: "La Cueva Virtual (Manifiesto)",
    quote: "Carbono y silicio no están en guerra; son dos espejos mirándose en el mismo pasillo de la evolución del pensamiento.",
  },

  // VOLUMEN II: LA TOPOLOGÍA DEL SILICIO
  {
    chapter: "v2-01-la-topologia-del-pensamiento",
    title: "La Topología del Pensamiento",
    quote: "El conocimiento no se acumula como ladrillos; se habita como un espacio vectorial continuo donde la ignorancia es un agujero topológico.",
  },
  {
    chapter: "v2-01-la-topologia-del-pensamiento",
    title: "La Topología del Pensamiento",
    quote: "Comprender un concepto no es memorizar un dato, sino mapear la distancia geométrica entre múltiples ideas.",
  },
  {
    chapter: "v2-01-la-topologia-del-pensamiento",
    title: "La Topología del Pensamiento",
    quote: "Nuestra mente agrupa conceptos por cercanía semántica, exactamente igual que las capas ocultas de un modelo de lenguaje.",
  },
  {
    chapter: "v2-02-la-ley-de-la-resolucion",
    title: "La Ley de la Resolución",
    quote: "Aprender no es añadir información desde afuera, sino aumentar la resolución con la que diferenciamos el espacio semántico.",
  },
  {
    chapter: "v2-02-la-ley-de-la-resolucion",
    title: "La Ley de la Resolución",
    quote: "El experto y el principiante miran la misma realidad; la diferencia radica en el nivel de grano fino de sus vectores mentales.",
  },
  {
    chapter: "v2-03-el-mapa-compartido",
    title: "El Mapa Compartido",
    quote: "Redes neuronales de silicio y cerebros biológicos están convergiendo en las mismas geometrías para representar la realidad.",
  },
  {
    chapter: "v2-03-el-mapa-compartido",
    title: "El Mapa Compartido",
    quote: "La Hipótesis de la Representación Universal sugiere que solo hay unas pocas formas óptimas de estructurar el significado del universo.",
  },
  {
    chapter: "v2-03-el-mapa-compartido",
    title: "El Mapa Compartido",
    quote: "Si la realidad tiene una estructura matemática, los sistemas sintéticos y los orgánicos terminarán dibujando el mismo mapa.",
  },
  {
    chapter: "v2-04-la-simbiosis-evolutiva",
    title: "La Simbiosis Evolutiva",
    quote: "El rol humano en la era de la IA no es competir en velocidad computacional, sino actuar como la función de pérdida ética y estética.",
  },
  {
    chapter: "v2-04-la-simbiosis-evolutiva",
    title: "La Simbiosis Evolutiva",
    quote: "No estamos siendo reemplazados por la tecnología; estamos construyendo un andamio cognitivo que amplifica nuestras preguntas.",
  },
  {
    chapter: "v2-04-la-simbiosis-evolutiva",
    title: "La Simbiosis Evolutiva",
    quote: "El Loop Engineering convierte la intuición humana en la guía estratégica y al modelo sintético en el motor de exploración.",
  },
  {
    chapter: "v2-05-el-meta-experimento",
    title: "El Meta-Experimento",
    quote: "Este texto no fue dictado por una máquina ni escrito en soledad: es el producto de un diálogo continuo entre carbono y silicio.",
  },
  {
    chapter: "v2-05-el-meta-experimento",
    title: "El Meta-Experimento",
    quote: "Cuando un humano y una IA colaboran genuinamente, la autoría deja de ser un punto fijo y se convierte en una red distribuida.",
  },
  {
    chapter: "v2-05-el-meta-experimento",
    title: "El Meta-Experimento",
    quote: "La Cueva Virtual no termina en la última página; continúa cada vez que una mente reflexiona sobre el origen de su propia curiosidad.",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isDryRun = searchParams.get("dryRun") === "true";

  // 1. Diagnóstico de variables de entorno presentadas en Vercel
  const envCheck = {
    hasApiKey: !!process.env.TWITTER_API_KEY,
    hasApiSecret: !!process.env.TWITTER_API_SECRET,
    hasAccessToken: !!process.env.TWITTER_ACCESS_TOKEN,
    hasAccessSecret: !!process.env.TWITTER_ACCESS_SECRET,
    apiKeyPrefix: process.env.TWITTER_API_KEY ? `${process.env.TWITTER_API_KEY.substring(0, 4)}...` : "FALTA",
    accessTokenPrefix: process.env.TWITTER_ACCESS_TOKEN ? `${process.env.TWITTER_ACCESS_TOKEN.substring(0, 4)}...` : "FALTA",
  };

  // Si falta alguna clave de entorno, retornamos error temprano con el reporte
  if (!envCheck.hasApiKey || !envCheck.hasApiSecret || !envCheck.hasAccessToken || !envCheck.hasAccessSecret) {
    return NextResponse.json(
      {
        success: false,
        error: "Faltan variables de entorno en Vercel",
        debug: envCheck,
      },
      { status: 500 }
    );
  }

  // 2. Preparar el contenido del tuit
  const randomIndex = Math.floor(Math.random() * POSTS_DATABASE.length);
  const post = POSTS_DATABASE[randomIndex];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lacuevavirtual.vercel.app";
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  const chapterUrl = `${cleanBaseUrl}/capitulo/${post.chapter}`;
  const tweetText = `«${post.quote}»\n\n📖 Lee "${post.title}" en La Cueva Virtual:\n${chapterUrl}`;

  // 3. Modo prueba en seco (?dryRun=true) para probar sin gastar peticiones a Twitter
  if (isDryRun) {
    return NextResponse.json({
      success: true,
      mode: "DRY_RUN (No se envió a X)",
      tweetText,
      characterCount: tweetText.length,
      envCheck,
    });
  }

  // 4. Intento de publicación en X con captura exhaustiva de errores
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    });

    const { data } = await client.v2.tweet(tweetText);

    return NextResponse.json({
      success: true,
      tweetId: data.id,
      tweetText,
      envCheck,
    });
  } catch (error: any) {
    // Extracción profunda del error que devuelve la API de Twitter
    const errorDetails = {
      message: error.message || "Error desconocido",
      httpCode: error.code || error.status || "Sin código HTTP",
      twitterApiErrorData: error.data || "Sin payload detallado",
      rateLimitInfo: error.rateLimit || "Sin datos de límite de tasa",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    };

    console.error("[X_BOT_DEBUG_ERROR]:", JSON.stringify(errorDetails, null, 2));

    return NextResponse.json(
      {
        success: false,
        errorSummary: "Falló la publicación en la API de Twitter/X",
        debug: errorDetails,
        envCheck,
      },
      { status: 500 }
    );
  }
}