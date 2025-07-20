<?php

namespace App\Controller;

use App\Entity\ArtistVideo;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ArtistVideoPostController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $uploadVideo = $request->files->get('video');
        $artistVideo = new ArtistVideo();
        $artistVideo->setFile($uploadVideo);
        $artistVideo->setCreatedAt(new \DateTimeImmutable);

        return $artistVideo;
    }
}