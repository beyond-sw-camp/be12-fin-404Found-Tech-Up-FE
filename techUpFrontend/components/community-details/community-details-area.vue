<template>
    <section class="tp-postbox-details-area pb-120 pt-95">
      <div class="container">
        <div class="row">
          <div class="col-xl-9">
            <div class="tp-postbox-details-top">
              <div class="tp-postbox-details-category">
                <span>
                  <a href="#">{{ post.category }}</a>
                </span>
              </div>
              <h3 class="tp-postbox-details-title">{{ post.title }}</h3>
              <div class="tp-postbox-details-meta mb-50">
                <span data-meta="author">
                  <svg-user-2 />
                  작성자 <a href="#">{{ post.author }}</a>
                </span>
                <span>
                  <svg-date />
                  {{ post.date }}
                </span>
                <span>
                  <svg-comments />
                  <a href="#">댓글 ({{ post.comments }})</a>
                </span>
              </div>
            </div>
          </div>
  
          <div class="col-xl-12">
            <div class="tp-postbox-details-thumb">
              <img src="/img/blog/details/blog-big-1.jpg" alt="썸네일 이미지" />
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-xl-9 col-lg-8">
            <div class="tp-postbox-details-main-wrapper">
              <div class="tp-postbox-details-content">
                <p class="tp-dropcap">
                  세일즈 프로세스는 성공적인 팀 운영에 필수입니다. 겉보기엔 매끄럽지만, 그 이면엔 많은 연습과 계획이 숨어있습니다.
                </p>
                <p>
                  원격 팀과 일할 때 자주 겪는 어려움은 프로세스의 흐름이 잘 보이지 않는다는 점입니다. 아래 내용을 통해 그것을 어떻게 해결할 수 있을지 살펴봅니다.
                </p>
  
                <h4 class="tp-postbox-details-heading">빠르게 소비되는 콘텐츠와 거리두기</h4>
                <p>
                  반복되는 패턴에서 벗어나려면 우선 의식적인 판단이 필요합니다. 커뮤니티도 마찬가지입니다.
                </p>
  
                <div class="tp-postbox-details-desc-thumb text-center">
                  <img src="/img/blog/details/blog-details-sm-1.jpg" alt="상세 이미지" />
                  <span class="tp-postbox-details-desc-thumb-caption">커뮤니티 사용자들의 대표 후기</span>
                </div>
  
                <p>
                  “우리는 당신과 함께 새로운 전략을 시작하게 되어 기쁩니다. 프로젝트 팀과의 킥오프 미팅은 곧 진행될 예정입니다.”
                </p>
  
                <div class="tp-postbox-details-quote">
                  <blockquote>
                    <div class="tp-postbox-details-quote-shape">
                      <img
                        class="tp-postbox-details-quote-shape-1"
                        src="/img/blog/details/shape/line.png"
                        alt=""
                      />
                      <img
                        class="tp-postbox-details-quote-shape-2"
                        src="/img/blog/details/shape/quote.png"
                        alt=""
                      />
                    </div>
                    <p>모든 문제엔 해답이 있다. 다만 그것을 찾아내는 것이 중요하다.</p>
                    <cite>Shahnewaz Sakil</cite>
                  </blockquote>
                </div>
  
                <h4 class="tp-postbox-details-heading">창작자들을 위한 열린 공간</h4>
                <p>
                  커뮤니티는 정보 제공과 동시에 감정적 연결을 만들어가는 장소입니다.
                </p>
  
                <div class="tp-postbox-details-list">
                  <ul>
                    <li>창작의 과정을 공유할 수 있습니다.</li>
                    <li>다른 사용자와의 협업이 가능합니다.</li>
                    <li>아카이빙을 통해 지속적인 기록이 이뤄집니다.</li>
                  </ul>
                </div>
  
                <p>
                  명확한 커뮤니티 구조와 콘텐츠 가이드는 사용자 경험을 높여줍니다.
                </p>
  
                <div class="tp-postbox-details-share-wrapper">
                  <div class="row">
                    <div class="col-xl-8 col-lg-6">
                      <div class="tp-postbox-details-tags tagcloud">
                        <span>태그:</span>
                        <a href="#">기록</a>
                        <a href="#">커뮤니티</a>
                        <a href="#">감정</a>
                        <a href="#">트렌드</a>
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-6">
                      <div class="tp-postbox-details-share text-md-end">
                        <span>공유하기:</span>
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="#"><i class="fa-brands fa-vimeo-v"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
  
                <!-- 이전/다음 글 이동 -->
                <community-details-navigation />
  
                <!-- 작성자 정보 -->
                <div
                  class="tp-postbox-details-author d-sm-flex align-items-start"
                  style="background-color: #F4F7F9"
                >
                  <div class="tp-postbox-details-author-thumb">
                    <a href="#">
                      <img src="/img/users/user-11.jpg" alt="작성자 이미지" />
                    </a>
                  </div>
                  <div class="tp-postbox-details-author-content">
                    <span>작성자</span>
                    <h5 class="tp-postbox-details-author-title">
                      <a href="#">Theodore Handle</a>
                    </h5>
                    <p>
                      내외부 프로세스를 정의하고 따름으로써, 더 명확한 목표와 협업 방식이 마련됩니다.
                    </p>
                    <div class="tp-postbox-details-author-social">
                      <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                      <a href="#"><i class="fa-brands fa-twitter"></i></a>
                      <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                      <a href="#"><i class="fa-brands fa-vimeo-v"></i></a>
                    </div>
                  </div>
                </div>
  
                <!-- 댓글 영역 -->
                <community-details-comments />
  
                <!-- 댓글 작성 폼 -->
                <forms-community-reply-form />
              </div>
            </div>
          </div>
  
          <!-- 사이드바 -->
          <div class="col-xl-3 col-lg-4">
            <community-sidebar />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({
    post: Object
  });
  </script>
  