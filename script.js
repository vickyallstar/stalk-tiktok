async function stalk() {
  const username = document.getElementById("username").value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) {
    alert("Masukkan username dulu bro 😅");
    return;
  }

  try {
    const res = await fetch(`https://api.sxtream.xyz/stalk/tiktokstalk?username=${username}`);
    const data = await res.json();

    if (data.status !== 200) {
      alert("User tidak ditemukan 😔");
      profileDiv.style.display = "none";
      return;
    }

    const user = data.result.user;
    const stats = data.result.stats;

    document.getElementById("avatar").src = user.avatarLarger;

    // cek verified
    let verifiedIcon = "";
    if (user.verified) {
      verifiedIcon = `<img src="pngtree-instagram-bule-tick-insta-blue-star-vector-png-image_6695210-removebg-preview.png" class="verified" alt="verified">`;
    }

    document.getElementById("nickname").innerHTML = `${user.nickname} ${verifiedIcon}`;
    document.getElementById("userUnique").innerText = `@${user.uniqueId}`;
    document.getElementById("signature").innerText = user.signature || "Tidak ada bio";

    document.getElementById("followers").innerText = stats.followerCount;
    document.getElementById("following").innerText = stats.followingCount;
    document.getElementById("likes").innerText = stats.heart;

    profileDiv.style.display = "block";

  } catch (err) {
    alert("Error saat fetch data 🚨");
    console.error(err);
  }
}
