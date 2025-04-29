// plugins/ws.client.js
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs.js'
import { toast } from 'vue3-toastify'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('connectWebSocket', (userIdx) => {
    if (!userIdx) {
      console.warn('[WebSocket] ❌ userIdx 없음. 연결 생략')
      return
    }

    console.info(`[WebSocket] 🌐 연결 시도 (userIdx: ${userIdx})`)
    const socket = new SockJS('http://localhost:8080/ws-notification', null, { withCredentials: true })


    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 3000,
      debug: (str) => console.log(`[WebSocket] DEBUG: ${str}`)
    })

    let isSubscribed = false

    stompClient.onConnect = () => {
      const destination = `/user/queue/notification`

      if (!isSubscribed) {
        console.info(`[WebSocket] ✅ 연결 성공 → 구독 경로: ${destination}`)

        stompClient.subscribe(destination, (message) => {
          if (!message || !message.body) {
            console.warn('[WebSocket] ⚠️ 메시지 수신했으나 내용 없음')
            return
          }

          console.log('[WebSocket] 📩 원본 메시지:', message.body)

          try {
            const payload = JSON.parse(message.body)
            console.log('[WebSocket] ✅ 파싱된 메시지:', payload)

            // 화면 이동 도중 알림 사라짐 방지
            requestAnimationFrame(() => {
              setTimeout(() => {
                toast.info(`${payload.title} - ${payload.content}`, {
                  position: 'top-right',
                  timeout: 4000,
                })
                console.log('[WebSocket] 🔔 토스트 출력 완료')
              }, 200) // 최소 딜레이
            })
          } catch (parseError) {
            console.error('[WebSocket] ❌ 메시지 파싱 실패:', parseError)
          }
        })

        isSubscribed = true
      }
    }

    stompClient.onWebSocketError = (error) => {
      console.error('[WebSocket] ❌ 소켓 오류:', error)
    }

    stompClient.onStompError = (frame) => {
      console.error('[WebSocket] ❌ STOMP 오류:', frame)
    }

    stompClient.onDisconnect = () => {
      console.warn('[WebSocket] ⚠️ 연결 종료됨')
      isSubscribed = false
    }

    try {
      stompClient.activate()
      console.log('[WebSocket] 🚀 STOMP 클라이언트 활성화 요청 완료')
    } catch (activateError) {
      console.error('[WebSocket] ❌ STOMP 클라이언트 활성화 실패:', activateError)
    }
  })
})
