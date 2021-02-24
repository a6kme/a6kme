const scales = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Am', 'Bm', 'Cm', 'Dm', 'Em', 'Fm', 'Gm'];
const scaleNotes = {
  A: 'A B C♯ D E F♯ G♯ A',
  B: 'B C♯ D♯ E F♯ G♯ A♯ B',
  C: 'C D E F G A B C',
  D: 'D E F♯ G A B C♯ D',
  E: 'E F♯ G♯ A B C♯ D♯ E',
  F: 'F G A B♭ C D E F',
  G: 'G A B C D E F♯ G',
  Am: 'A B C D E F G A',
  Bm: 'B C♯ D E F♯ G A B',
  Cm: 'C D E♭ F G A♭ B♭ C',
  Dm: 'D E F G A B♭ C D',
  Em: 'E F♯ G A B C D E',
  Fm: 'F G A♭ B♭ C D♭ E♭ F',
  Gm: 'G A B♭ C D E♭ F G'
};
export const getScale = () => scales[Math.floor(Math.random() * scales.length)];
export const getNotesOfScale = scale => scaleNotes[scale];
