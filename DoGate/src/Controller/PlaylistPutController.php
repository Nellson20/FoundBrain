<?php

namespace App\Controller;


use App\Entity\Playlist;
use App\Entity\Picture;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use ApiPlatform\Api\IriConverterInterface;
use App\Config\PlaybackMode;
use DateTimeImmutable;

class PlaylistPutController extends AbstractController
{
    public function __invoke(Playlist $playlist, Request $request, IriConverterInterface $iriConverter):Playlist
    {
        if (!($playlist instanceof Playlist))
            throw new HttpException(422, "l'IRI n'est pas de type Playlist");

        $requestData = $request->request->all();

        if(isset ($requestData['title']))
        {
            $playlist->setTitle($requestData['title']);
        }
        if(isset ($requestData['description']))
        {
            $playlist->setDescription($requestData['description']);
        }
        if(isset ($requestData['genre']))
        {
            $playlist->setGenre($requestData['genre']);
        }
        if(isset ($requestData['playbackMode']))
        {
            $playlist->setPlaybackMode((PlaybackMode::from($requestData['playbackMode'])));
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
            $playlist->setTotalDuration($requestData['rating']);
        }

        if(isset($requestData['rating']))
        {
            if ($request->files->get('cover'))
            {
                $uploadedFile = $request->files->get('cover');
                $picture = new Picture();
                $picture->setFile($uploadedFile);
            }
            $playlist->setCover($picture);
        }
        if(isset($requestData['artistVideos']))
        {
            $artistVideosIris = $requestData['artistVideos'];
            if(isset($requestData['artistVideos']))
            {
                $oldArtistVideo= $playlist->getArtistVideos();
                foreach($oldArtistVideo as $deletableArtistVideo)
                {
                    $playlist->removeArtistVideo($deletableArtistVideo);
                }
                foreach ($artistVideosIris as $artistVideoIri) {
                    $artistVideo = $iriConverter->getResourceFromIri($artistVideoIri);
                    $playlist->addArtistVideo($artistVideo);
                }
            }
        }

        return $playlist;
    }
}
