export const getNudeSelectFields = () => ({
  id: true,
  description: true,
  creditPrice: true,
  createdAt: true,
  userId: true,
  buyers: true,
  media: {
    select: {
      id: true,
      thumbnailId: true,
      videoId: true,
    },
  },
  user: {
    select: {
      id: true,
      pseudo: true,
      profileImageId: true,
    },
  },
});
