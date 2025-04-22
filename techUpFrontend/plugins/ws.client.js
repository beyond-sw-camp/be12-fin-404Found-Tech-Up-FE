// plugins/ws.client.js
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs.js'
import { toast } from 'vue3-toastify'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('connectWebSocket', (userIdx) => {
    if (!userIdx) {
      console.warn('[WebSocket] userIdx 없음. 연결 생략')
      return
    }

    // plugins/ws.client.js
const socket = new SockJS('http://localhost:8080/ws-notification')

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 3000,
      onConnect: () => {
        const dest = `/queue/notification.${userIdx}`
        console.info('[✅ WebSocket 연결됨]', dest)

        stompClient.subscribe(dest, (message) => {
          try {
            const payload = JSON.parse(message.body)
            toast.info(`${payload.title} - ${payload.content}`, {
              position: 'top-right',
              timeout: 4000,
            })
          } catch (e) {
            console.error('[WebSocket 메시지 파싱 오류]', e)
          }
        })
      },
      onStompError: (frame) => {
        console.error('[STOMP 오류]', frame)
      },
    })

    stompClient.activate()
  })
})
