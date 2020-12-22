import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import theme from '../theme';
import { makeStyles } from '@material-ui/core/styles';

interface ParamTypes {
  text: string;
}

const useStyles = makeStyles({
  paragraph: {
    "& p": {
      marginBottom: theme.spacing(1.5)
    }
  }
});

const InfoText: React.FC = () => {
  const classes = useStyles();
  const { text } = useParams<ParamTypes>();

  if (text === 'acoustic') {
    return (
      <div className={classes.paragraph}>
        <Typography variant="h5">Acoustic Guitar</Typography>
        <Typography>An acoustic guitar is a musical instrument in the guitar family. Its strings vibrate a sound board on a resonant body to project a sound wave through the air. The original, general term for this stringed instrument is guitar, and the retronym 'acoustic guitar' distinguishes it from an electric guitar, which relies on electronic amplification. Typically, a guitar's body is a sound box, of which the top side serves as a sound board that enhances the vibration sounds of the strings. In standard tuning the guitar's six strings are tuned (low to high) E2 A2 D3 G3 B3 E4.</Typography>
        <Typography>Guitar strings may be plucked individually with a pick or fingertip, or strummed to play chords. Plucking a string causes it to vibrate at a fundamental pitch determined by the string's length, mass, and tension. (Overtones are also present, closely related to harmonics of the fundamental pitch.) The string causes the soundboard and the air enclosed by the sound box to vibrate. As these have their own resonances, they amplify some overtones more strongly than others, affecting the timbre of the resulting sound.</Typography>
      </div>
    )
  } else if (text === 'electric') {
    return (
      <div className={classes.paragraph}>
        <Typography variant="h5">Electric Guitar</Typography>
        <Typography>An electric guitar is a guitar that requires external amplification in order to be heard at typical performance volumes. It uses one or more pickups to convert the vibration of its strings into electrical signals, which ultimately are reproduced as sound by loudspeakers. The sound can be shaped or electronically altered to achieve different timbres or tonal qualities, making it quite different than an acoustic guitar. Often, this is done through the use of effects such as reverb, distortion and "overdrive"; the latter is considered to be a key element of electric blues guitar music and rock guitar playing.</Typography>
        <Typography>Invented in 1932, the electric guitar was adopted by jazz guitar players, who wanted to play single-note guitar solos in large big band ensembles. Early proponents of the electric guitar on record include Les Paul, Lonnie Johnson, Sister Rosetta Tharpe, T-Bone Walker, and Charlie Christian. During the 1950s and 1960s, the electric guitar became the most important instrument in popular music. It has evolved into an instrument that is capable of a multitude of sounds and styles in genres ranging from pop and rock to country music, blues and jazz. It served as a major component in the development of electric blues, rock and roll, rock music, heavy metal music and many other genres of music.</Typography>
        <Typography>Electric guitar design and construction varies greatly in the shape of the body and the configuration of the neck, bridge, and pickups. Guitars may have a fixed bridge or a spring-loaded hinged bridge, which lets players "bend" the pitch of notes or chords up or down, or perform vibrato effects. The sound of an electric guitar can be modified by new playing techniques such as string bending, tapping, and hammering-on, using audio feedback, or slide guitar playing.</Typography>
        <Typography>There are several types of electric guitar, including: the solid-body guitar; various types of hollow-body guitars; the six-string guitar (the most common type), which is usually tuned E, B, G, D, A, E, from highest to lowest strings; the seven-string guitar, which typically adds a low B string below the low E; the eight-string guitar, which typically adds a low E or F# string below the low B; and the twelve-string guitar, which has six pairs of strings.</Typography>
        <Typography>In pop and rock music, the electric guitar is often used in two roles: as a rhythm guitar, which plays the chord sequences or progressions, and riffs, and sets the beat (as part of a rhythm section); and as a lead guitar, which provides instrumental melody lines, melodic instrumental fill passages, and solos. In a small group, such as a power trio, one guitarist switches between both roles. In large rock and metal bands, there is often a rhythm guitarist and a lead guitarist.</Typography>
      </div>
    )
  } else if (text === 'bass') {
    return (
      <div className={classes.paragraph}>
        <Typography variant="h5">Bass</Typography>
        <Typography>The bass guitar, electric bass, or simply bass, is the lowest-pitched member of the guitar family. It is a plucked string instrument similar in appearance and construction to an electric or an acoustic guitar, but with a longer neck and scale length, and typically four to six strings or courses. Since the mid-1950s, the bass guitar has largely replaced the double bass in popular music.</Typography>
        <Typography>The four-string bass is usually tuned the same as the double bass, which corresponds to pitches one octave lower than the four lowest-pitched strings of a guitar (E, A, D, and G). It is played primarily with the fingers or thumb, or by striking with a pick. The electric bass guitar has pickups and must be connected to an amplifier and speaker.</Typography>
      </div>
    )
  } else if (text === 'ukulele') {
    return (
      <div className={classes.paragraph}>
        <Typography variant="h5">Ukulele</Typography>
        <Typography>The ukulele (/ˌjuːkəˈleɪli/ YOO-kə-LAY-lee; from Hawaiian: ʻukulele [ˈʔukuˈlɛlɛ], approximately OO-koo-LEH-leh) is a member of the lute family of instruments. It generally employs four nylon strings.</Typography>
        <Typography>The ukulele originated in the 19th century as a Hawaiian adaptation of the Portuguese machete (cavaquinho), a small guitar-like instrument, which was introduced to Hawaii by Portuguese immigrants, mainly from Madeira and the Azores. It gained great popularity elsewhere in the United States during the early 20th century and from there spread internationally.</Typography>
        <Typography>The tone and volume of the instrument vary with size and construction. Ukuleles commonly come in four sizes: soprano, concert, tenor, and baritone.</Typography>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default InfoText;