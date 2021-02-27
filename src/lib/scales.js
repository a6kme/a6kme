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
  'C♯m': 'C♯ D♯ E F♯ G♯ A B C♯',
  Dm: 'D E F G A B♭ C D',
  Em: 'E F♯ G A B C D E',
  Fm: 'F G A♭ B♭ C D♭ E♭ F',
  'F♯m': 'F♯ G♯ A B C♯ D E F♯',
  Gm: 'G A B♭ C D E♭ F G',
  'G♯m': 'G♯ A♯ B C♯ D♯ E F♯ G♯',
};
const relativeMinorScaleSequence = ['A', 'F♯m', 'B', 'G♯m', 'C', 'Am', 'D', 'Bm', 'E', 'C♯m', 'F', 'Dm', 'G', 'Em'];

export const getRelativeMinorScale = (currentScale = null) => {
  if (currentScale) {
    const indexOfCurrentScale = relativeMinorScaleSequence.indexOf(currentScale);
    return relativeMinorScaleSequence[
      (indexOfCurrentScale + 1) % relativeMinorScaleSequence.length];
  }
  return relativeMinorScaleSequence[0];
};
export const getScale = () => scales[Math.floor(Math.random() * scales.length)];
export const getNotesOfScale = (scale) => scaleNotes[scale].split(' ');
