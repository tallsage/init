import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import { State } from 'react-native-gesture-handler';

import { WebView } from 'react-native-webview';

export default function LoginScreen(props) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false)

  const onLogin = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('userId', userId);
      setLoading(false);
      props.navigation.push('Call');
    } catch (err) {
      console.log('Error', err);
      setLoading(false);
    }
  };


// * - Обязательные.

// let cshBlockIframeVideoCall = document.getElementById('cshBlockIframeVideoCall'); // Блок в котором будет находиться iframe "Видеозвонок"*
// let cshBtnVideoCall = document.querySelector("#cshBtnVideoCall"); // Кнопка "VideoCall"*
// let cshBtnCloseVideoCall = document.querySelector("#cshBtnCloseVideoCall"); // Кнопка "Close VideoCall"

const handleClickFrame = () =>{
  setFlag(true)
}

const handleClickVideo = () =>{

}

const handleClose = () =>{
  setFlag(false)
}

// if(cshBtnVideoCall !== null){
//   cshBtnVideoCall.addEventListener("click", () => {
//     cshBlockIframeVideoCall.innerHTML = "";
//     let cshIframe = document.createElement('iframe'); // Создаем элемент iframe*
//     let cshLinkVideoCall = "Вставить ссылку видеозвонка"; // Ссылка видеозвонка*

//     cshIframe.setAttribute('src', cshLinkVideoCall); // Добавляем в созданный iframe ссылку видеозвонка "cshLinkVideoCall"*
//     cshIframe.setAttribute('height', '100%'); // Назначаем iframe высоту
//     cshIframe.setAttribute('width', '100%'); // Назначаем iframe ширину
//     cshIframe.setAttribute('id', 'cshVideoCallIframe'); // Добавляем id для iframe "cshVideoCallIframe"*
//     cshIframe.setAttribute('allow', 'geolocation; microphone; camera'); // Добавляем дополнительные атрибуты iframe (Обезательные атрибуты видеозвонка)*
//      cshIframe.setAttribute('allowfullscreen', 'true'); // Атрибут allowfullscreen разрешает для фрейма полноэкранный режим.

//     cshBlockIframeVideoCall.appendChild(cshIframe); // Вставляем созданный iframe в блок "cshBlockIframeVideoCall"*

//     if(cshBtnCloseVideoCall != null){
//       cshBtnCloseVideoCall.classList.remove("csh__btn-group_item_hide"); // При нажатии на кнопку "VideoCall", появляется кнопка "Close VideoCall"
//     }

//     // Событие "Close VideoCall", если имеется кнопка "Close VideoCall"
//     if(cshBtnCloseVideoCall !== null){
//       cshBtnCloseVideoCall.onclick = () => {
//         if (cshIframe !== null){
//           if(cshBtnCloseVideoCall != null){
//             cshBtnCloseVideoCall.classList.add("csh__btn-group_item_hide"); // Скрыть кнопку "Close VideoCall"
//             cshIframe.contentWindow.postMessage("close", "https://dashboard.callshark.ru"); // Завершить сеанс iframe*
//             setTimeout( () => { cshIframe.remove() }, 1000) // Удалить iframe*
//           }
//         }
//       };
//     }
//   });
// }

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.heading}>Enter your id</Text>
        <TextInput
          label="Your  ID"
          onChangeText={text => setUserId(text)}
          mode="outlined"
          style={styles.input}
        />                     
        <Button
          mode="contained"
          onPress={onLogin}
          loading={loading}
          style={styles.btn}
          contentStyle={styles.btnContent}
          disabled={userId.length === 0}>
          Login
        </Button>
      </View>
      <WebView
        source={{html: 
          `<!DOCTYPE html>
          <html>
            <head>
            <style>
            /* CallChark */
.csh__btn_link-callShark {
  text-decoration: none;
  color: #47AFFF;
}

/* VideoCall */ 
#cshBlockIframeVideoCall {
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   width: 500px;
   height: 500px;
   margin: auto;
   z-index: 9090;
}
.csh__btn-group_video-call {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 9090;
  cursor: pointer;
}
.csh__btn-group_video-call .csh__btn-group_item {
  text-align: center;
  color: #fff;
  padding: .25rem .5rem;
  font-size: 14px;
  line-height: 1.5;
  border-radius: .2rem;
  transition: .2s;
  cursor: pointer;
}
.csh__btn-group_video-call :first-child {
  background: #58E579;
  border: 1px solid #58E579;
}
.csh__btn-group_video-call :last-child {
  background: #FF6767;
  border: 1px solid #FF6767;
}
.csh__btn-group_video-call div:first-child:hover {
  background: #3AC75B;
  border: 1px solid #3AC75B;
}
.csh__btn-group_video-call div:last-child:hover {
  background: #E14949;
  border: 1px solid #E14949;
}
.csh__btn-group_video-call .csh__btn-group_item_hide {
  display: none;
}
            </style>
            </head>
            <body>
            <script>
   

    let cshBlockIframeVideoCall = document.getElementById("cshBlockIframeVideoCall"); 
    let cshBtnVideoCall = document.querySelector("#cshBtnVideoCall"); 
    let cshBtnCloseVideoCall = document.querySelector("#cshBtnCloseVideoCall"); 

    if (cshBtnVideoCall !== null) {
        cshBtnVideoCall.addEventListener("click", () => {
            cshBlockIframeVideoCall.innerHTML = "";
            let cshIframe = document.createElement("iframe"); 
            let cshLinkVideoCall = "https://test.callshark.ru/calls/callHttp?c=1858&g=0&r=-1&s=1861&mode=video&typeCall=i"; 

            cshIframe.setAttribute("src", cshLinkVideoCall); 
            cshIframe.setAttribute("height", "100%"); 
            cshIframe.setAttribute("width", "100%"); 
            cshIframe.setAttribute("id", "cshVideoCallIframe"); 
            cshIframe.setAttribute("allow", "geolocation; microphone; camera");
            cshIframe.setAttribute("allowfullscreen", "true"); 

            cshBlockIframeVideoCall.appendChild(cshIframe); 

            if (cshBtnCloseVideoCall != null) {
                cshBtnCloseVideoCall.classList.remove("csh__btn-group_item_hide"); 
            }

            if (cshBtnCloseVideoCall !== null) {
                cshBtnCloseVideoCall.onclick = () => {
                    if (cshIframe !== null) {
                        if (cshBtnCloseVideoCall !== null) {
                            cshBtnCloseVideoCall.classList.add("csh__btn-group_item_hide");
                            cshIframe.contentWindow.postMessage("close", "https://test.callshark.ru");
                            setTimeout( () => { cshIframe.remove() }, 1000) 
                        }
                    }
                };
            }
        });
    }
</script>
            <a class="csh__btn_link-callShark" href="https://dashboard.callshark.ru/CallShark/ru/">Powered by
            CallShark</a>
            
            <div id="cshBlockIframeVideoCall"></div>
            
            <div class="csh__btn-group_video-call">
                  <button class="csh__btn-group_item" id="cshBtnVideoCall">VideoCall</button>
                  <button class="csh__btn-group_item csh__btn-group_item_hide" id="cshBtnCloseVideoCall">Close VideoCall</button>
            </div>
            </body>
          </html>`
          //'<iframe width="100%" height="50%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        }}
        style={{marginTop: 20}}
      />
      <View >
        <Button onPress={handleClickFrame} >VideoCall</Button>
        {(flag) ? ( <Button onPress={handleClose}>Close VideoCall</Button>):(<></>)}
      </View>   
    </View>
  );
}

const styles = StyleSheet.create({
//   cshBlockIframeVideoCall: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     width: 500,
//     height: 500,
//     margin: 'auto',
//     zIndex: 9090,
//  },
//  csh__btnGroup_videoCall: {
//     position: 'absolute',
//     display: 'flex',
//     justifyContent: 'center',
//     top: 100,
//     backgroundColor: 'red',
//     left: 0,
//     right: 0,
//     margin: 'auto',
//     zIndex: 9090,
//     cursor: 'pointer'
//   },
  root: {
    backgroundColor: '#fff',
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    // alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    height: 60,
    marginBottom: 10,
  },
  btn: {
    height: 60,
    alignItems: 'stretch',
    justifyContent: 'center',
    fontSize: 18,
  },
  btnContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
});