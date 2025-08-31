<?php

namespace App\Controller;


use ApiPlatform\Api\IriConverterInterface;
use App\Config\PlaybackMode;
use App\Entity\Playlist;
use DateTimeImmutable;
use App\Entity\Picture;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PlaylistPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Playlist
    {
        $requestData = $request->request->all();

        $playlist = neW Playlist();
        $playlist->setTitle($requestData['title']);

        if(isset ($requestData['description']))
        {
            $playlist->setDescription($requestData['description']);
        }
        if(isset ($requestData['genre']))
        {
            $playlist->setGenre($requestData['genre']);
        }
        
        if(isset($requestData['creationDate']))
        {
            $creationDate = new DateTimeImmutable($requestData['creationDate']);
            $playlist->setCreationDate($creationDate);
        }
        if(isset($requestData['totalDuration']))
        {
            $playlist->setTotalDuration($requestData['totalDuration']);
        }
        if(isset($requestData['rating']))
        {
            $playlist->setRating($requestData['rating']);
        }
        
        $playlist->setPlaybackMode((PlaybackMode::from($requestData['playbackMode'])));

        if ($request->files->get('cover'))
        {
            $uploadedFile = $request->files->get('cover');
            $picture = new Picture();
            $picture->setFile($uploadedFile);
        }

        $playlist->setCover($picture);

        $artistVideosIris = $requestData['artistVideos'];
        foreach ($artistVideosIris as $artistVideoIri) {
            $artistVideo = $iriConverter->getResourceFromIri($artistVideoIri);
            $playlist->addArtistVideo($artistVideo);
        }

        $playlist->setAuthor($iriConverter->getResourceFromIri($requestData['author']));

        return $playlist;
    }
}
