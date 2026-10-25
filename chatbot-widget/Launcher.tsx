"use client";
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {MessageCircle,Sparkles,X,ArrowUp,LoaderCircle} from 'lucide-react';
import styles from './widget.module.css';
const assistantOrigin='https://trueprint-assistant.harshwardensingh.chatgpt.site';
export default function ChatbotLauncher(){
 const pathname=usePathname();
 const [open,setOpen]=useState(false),[mounted,setMounted]=useState(false),[ready,setReady]=useState(false),[slow,setSlow]=useState(false),[attempt,setAttempt]=useState(0),[draft,setDraft]=useState('');
 const draftRef=useRef(''),frame=useRef<HTMLIFrameElement>(null),button=useRef<HTMLButtonElement>(null);
 const hidden=pathname?.startsWith('/admin');
 function close(){setOpen(false);button.current?.focus();}
 function warm(){setMounted(true);}
 function retry(){setReady(false);setSlow(false);setAttempt(n=>n+1);}
 useEffect(()=>{function receive(event:MessageEvent){if(event.origin!==assistantOrigin||event.source!==frame.current?.contentWindow)return;if(event.data?.type==='trueprint:close')close();if(event.data?.type==='trueprint:ready'){if(draftRef.current)frame.current?.contentWindow?.postMessage({type:'trueprint:draft',text:draftRef.current},assistantOrigin);setReady(true);setSlow(false);}if(event.data?.type==='trueprint:error')setSlow(true);}function key(event:KeyboardEvent){if(event.key==='Escape')close();}window.addEventListener('message',receive);window.addEventListener('keydown',key);return()=>{window.removeEventListener('message',receive);window.removeEventListener('keydown',key);};},[]);
 // Wait for website assets to finish before quietly preparing the chat.
 useEffect(()=>{
  if(hidden)return;
  let idle:number|undefined,timer:number|undefined;
  function prepare(){if(typeof window.requestIdleCallback==='function')idle=window.requestIdleCallback(()=>setMounted(true),{timeout:3000});else timer=window.setTimeout(()=>setMounted(true),1000);}
  if(document.readyState==='complete')prepare();else window.addEventListener('load',prepare,{once:true});
  return()=>{window.removeEventListener('load',prepare);if(idle!==undefined)window.cancelIdleCallback(idle);if(timer!==undefined)window.clearTimeout(timer);};
 },[hidden]);
 useEffect(()=>{if(!open||ready)return;const timer=window.setTimeout(()=>setSlow(true),8000);return()=>window.clearTimeout(timer);},[open,ready,attempt]);
 useEffect(()=>{if(hidden)return;document.documentElement.classList.add('trueprint-chat-mounted');const link=document.createElement('link');link.rel='preconnect';link.href=assistantOrigin;document.head.appendChild(link);return()=>{document.documentElement.classList.remove('trueprint-chat-mounted');link.remove();};},[hidden]);
 if(hidden)return null;
 return <div className={styles.widget}>
  <section id="trueprint-chat-panel" aria-hidden={!open} inert={!open} className={styles.panel+(open?' '+styles.panelOpen:'')} aria-label="TruePrint assistant">
   <div className={styles.chatBody}>
    {mounted&&<iframe key={attempt} ref={frame} className={ready?styles.frameReady:styles.frameLoading} aria-hidden={!ready} inert={!ready} src={assistantOrigin+'/widget?ui=fast-start'} title="Chat with TruePrint" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin"/>}
    {!ready&&<div className={styles.loadingShell}>
     <header><span className={styles.brandMark} aria-hidden="true"><MessageCircle size={24}/><Sparkles className={styles.spark} size={12}/></span><div><strong>TruePrint Assistant</strong><p>Products, gifts & custom ideas</p></div><button type="button" onClick={close} aria-label="Close chat"><X size={20}/></button></header>
     <div className={styles.loadingContent}><div className={styles.intro}><span>MADE FOR YOUR IDEAS</span><h3>Let’s create something<br/>worth remembering.</h3><p>Gifting, branding & everything in between.</p></div><p className={styles.welcome}>Welcome to TruePrint. What would you like to create?</p><p className={styles.connecting} role="status">{slow?'Chat is taking longer to connect.':<><LoaderCircle size={16}/> Connecting your conversation…</>}</p>{slow&&<div className={styles.recovery}><p>Please retry. This private preview requires you to be signed in to ChatGPT in this browser.</p><button type="button" onClick={retry}>Retry connection</button></div>}</div>
     <div className={styles.draftComposer}><label htmlFor="trueprint-loading-draft">You can type while we connect</label><div><textarea id="trueprint-loading-draft" aria-label="Draft your message while chat connects" placeholder="Type your message…" rows={2} maxLength={2000} value={draft} onChange={e=>{setDraft(e.target.value);draftRef.current=e.target.value;}}/><button type="button" disabled aria-label="Send available when connected"><ArrowUp size={20}/></button></div><p>Your draft will be ready to send when connected.</p></div>
    </div>}
   </div>
  </section>
  <button ref={button} type="button" className={styles.launcher+(open?' '+styles.launcherOpen:'')} aria-label={open?'Close TruePrint chat':'Chat with TruePrint'} aria-expanded={open} aria-controls="trueprint-chat-panel" onPointerEnter={warm} onFocus={warm} onTouchStart={warm} onClick={()=>{if(open)close();else{warm();setOpen(true);}}}><span className={styles.chatIcon} aria-hidden="true"><MessageCircle size={29} strokeWidth={1.8}/><Sparkles className={styles.spark} size={13}/></span><span className={styles.closeIcon} aria-hidden="true"><X size={28} strokeWidth={2}/></span></button>
 </div>;
}
