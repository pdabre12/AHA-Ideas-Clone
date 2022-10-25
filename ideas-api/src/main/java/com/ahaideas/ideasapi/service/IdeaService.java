package com.ahaideas.ideasapi.service;

import com.ahaideas.ideasapi.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class IdeaService {
    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private CommentRepository commentRepository;

    public List<Idea> listAllIdeas() {
        return ideaRepository.findAll();
    }

    public List<Comment> listAllComments(int ideaId) {
        return commentRepository.findByIdeaId(ideaId);
    }

    public void saveIdea(Idea idea) {
        idea.setCreated(new Date());
        idea.setStatus("Submitted");
        idea.setGithubLink("https://github.com/sjsudev/idea-repo-1skq");
        ideaRepository.save(idea);
    }

    public void vote(Votes vote) {
        vote.setDateTime(new Date());
        voteRepository.save(vote);
    }

    public VoteCount getVotes(int ideaId) {
        int count = voteRepository.findByIdeaId(ideaId).size();
        return new VoteCount(count);
    }

    public void comment(Comment comment) {
        comment.setDateTime(new Date());
        commentRepository.save(comment);
    }

    /*public void saveUser(User user) {
        userRepository.save(user);
    }

    public User getUser(Integer id) {
        return userRepository.findById(id).get();
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }*/
}