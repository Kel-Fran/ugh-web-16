import { useMemo, useState } from 'react'

function Ex0() {
  const [checked, setChecked] = useState(false);
  return <>
           <input type="checkbox" checked={checked} onChange={()=>setChecked(!checked)} />
           <img src={checked ? "https://www.w3schools.com/js/pic_bulboff.gif" : "https://www.w3schools.com/js/pic_bulbon.gif"}/>
         </>

}

// Source - https://stackoverflow.com/a/1484514
// Posted by Anatoliy, modified by community. See post 'Timeline' for change history
// Retrieved 2026-10-13, License - CC BY-SA 3.0

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Ex1() {
  const [color, setColor] = useState(getRandomColor())
  return <div style={{flex: 1, backgroundColor: color}}>
  <button onClick={()=>{const c = getRandomColor();setColor(c);}}>change</button>
         </div>
}

function Ex2() {
  const TEXT_TRANSFORMS = ['uppercase', 'lowercase', 'capitalize', 'capitalize word', 'capitalize sentence', 'reverse'] as const;
  type TextTransform = typeof TEXT_TRANSFORMS[number];
  type TextTransformFn = (s:string)=>string;
  const TRANSFORMS: Record<TextTransform, TextTransformFn> = {
      uppercase(s){return s.toLocaleUpperCase() },
      lowercase(s){return s.toLocaleLowerCase()},
      capitalize(s){return s.at(0)!.toLocaleUpperCase()+s.substring(1).toLocaleLowerCase()},
    'capitalize word': s => s.split(' ').map(w => w.at(0)!.toLocaleUpperCase() + w.substring(1).toLocaleLowerCase()).join(' '),
      'capitalize sentence':s=>s.replaceAll(/([^.^?^!^]+)(?:[.?!])/gm, t => {
          let o = 0;
          while('\t\n\r '.includes(t[o])) o +=1; // I wasted too much time on trying to get this to work with regex
          return t.substring(0,o) + t.at(o)!.toLocaleUpperCase() + t.substring(o).toLocaleLowerCase()}),
      reverse(s) {return [...s].toReversed().join('');}
  }

    const ALL_DISABLED = Object.fromEntries(TEXT_TRANSFORMS.map(t => [t, false])) as {[k in TextTransform]: boolean};

    const [enabled, setEnabled] = useState<{[k in TextTransform]:boolean}>(ALL_DISABLED);

    const transform = txt => txt ? Object.entries(enabled).reduce((acc,r) => r[1] ? TRANSFORMS[r[0] as TextTransform](acc) : acc, txt) : '';
    const [enableTransform, setEnableTransform] = useState(false);
    const [text,setText]=useState('');

    function reset() {
        setEnabled(ALL_DISABLED);
        setEnableTransform(false);
        setText('');
    }

    return <>
        <input type="checkbox" checked={enableTransform} onChange={()=>setEnableTransform(!enableTransform)} name="e-text-transforms"/>
        <label htmlFor="e-text-transforms">enable text transformations</label>
        <button onClick={reset}>reset</button>
        {Object.entries(enabled).map(([name, checked], idx) => <div key={idx}>
            <input type="checkbox" name={name} checked={checked} onChange={()=>setEnabled({...enabled, [name]:!checked})}/>
            <label htmlFor={name}>{name}</label>
            </div>)}
        <p>{text.length ? `typed characters: ${text.length}` : 'no text'}</p>
        <p>{enableTransform ? transform(text) : text}</p>
        <textarea value={text} onChange={x => setText(x.target.value)}/>
        </>

}

function Ex3() { return <p> just use the complex calculator. it can do even more than this</p> }
function Ex4() {
    const [text, setText] = useState('');
    return <>
        <p>{text}</p>
        {[..."0123456789.+-*/"].map(c => <button onClick={()=>setText(t => t + c)}>{c}</button>)}
        <button onClick={()=>setText(eval(text))}>=</button>
        </>

}

export default function App() {
  const EXS = [Ex0, Ex1, Ex2, Ex3, Ex4];
    const [ex, setEx] = useState(EXS.length - 1);
    const EX = useMemo(() => EXS[ex], [ex]);

    return (<>
        <input type= "number" min = { 0} max = { EXS.length - 11} value = { ex } onChange = { x => setEx(+ x.target.value)} />
    < EX />
    </>);

}
