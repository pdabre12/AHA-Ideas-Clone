package com.ahaideas.ideasapi.controller;

import com.ahaideas.ideasapi.model.Comment;
import com.ahaideas.ideasapi.model.Idea;
import com.ahaideas.ideasapi.model.VoteCount;
import com.ahaideas.ideasapi.model.Votes;
import com.ahaideas.ideasapi.service.IdeaService;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@RestController
@RequestMapping("/ideas")
@CrossOrigin
public class IdeasController {

    @Autowired
    private IdeaService ideaService;

    @GetMapping("")
    public List<Idea> getIdeas() {
        return ideaService.listAllIdeas();

    }

    @PostMapping("")
    public ResponseEntity<Idea> create(@RequestBody Idea idea) {
        ideaService.saveIdea(idea);
        return new ResponseEntity<>(idea, HttpStatus.OK);
    }

    @PostMapping(path = "/vote")
    public ResponseEntity<Votes> vote(@RequestBody Votes votes) {
        try {
            ideaService.vote(votes);
            return new ResponseEntity<>(votes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(votes, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/vote/{ideaId}")
    public VoteCount getVoteCount(@PathVariable int ideaId ) {
        return ideaService.getVotes(ideaId);

    }

    @GetMapping(path = "/comments/{ideaId}")
    public List<Comment> getComments(@PathVariable int ideaId ) {
        return ideaService.listAllComments(ideaId);

    }

    @PostMapping(path = "/comment")
    public ResponseEntity<Comment> comment(@RequestBody Comment comment) {
        try {
            ideaService.comment(comment);
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(comment, HttpStatus.BAD_REQUEST);
        }
    }
}

