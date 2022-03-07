  import './App.css';
  import { useEffect } from 'react';

  function App() {

    //스크립트 파일 읽어오기
    const new_script = src => { 
      return new Promise((resolve, reject) => { 
        const script = document.createElement('script'); 
        script.src = src; 
        script.addEventListener('load', () => { 
          resolve(); 
        }); 
        script.addEventListener('error', e => { 
          reject(e); 
        }); 
        document.head.appendChild(script); 
      }); 
    };

    useEffect(() => { 
      //카카오맵 스크립트 읽어오기
      const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3707d33cbce0f19460ad345b067f6d23');
      
      //스크립트 읽기 완료 후 카카오맵 설정
      my_script.then(() => { 
        console.log('script loaded!!!');  
        const kakao = window['kakao']; 
        kakao.maps.load(() => {
          const mapContainer = document.getElementById('map');
          const options = { 
            center: new kakao.maps.LatLng(37.56000302825312, 127.97540593203321), //좌표설정
            level: 3,
            animate: {
              duration: 500
            }
          }; 
          const map = new kakao.maps.Map(mapContainer, options); 
          //맵생성
          // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
          var mapTypeControl = new kakao.maps.MapTypeControl();
          map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
          //맵 컨트롤러
          var zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
 
          //마커설정
          const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321); 
          const marker = new kakao.maps.Marker({ 
            position: markerPosition
          }); 
          marker.setMap(map); 
        });   
      }); 
    }, []);

    return (
      <div className="App">
        <div id="map" className="map"/>
      </div>
    );
  }

  export default App;
