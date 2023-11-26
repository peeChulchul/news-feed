function copyCurrentURL() {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("현재 게시물의 주소가 복사되었습니다.");
    })
    .catch((err) => {
      console.error("Something went wrong", err);
    });
}

function linkEditPage(uid, postid, navigate) {
  navigate(`/manage/newpost/${uid}/${postid}`);
}

export { copyCurrentURL, linkEditPage };
