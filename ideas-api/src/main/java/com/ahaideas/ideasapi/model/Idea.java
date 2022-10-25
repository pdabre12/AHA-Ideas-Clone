package com.ahaideas.ideasapi.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Table(name = "ideas")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Idea {

    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String category;

    private String username;

    private String title;

    private String description;

    private String status;

    private Date created;

    private String neededBy;

    public String getNeededBy() {
        return neededBy;
    }

    public void setNeededBy(String neededBy) {
        this.neededBy = neededBy;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public void setGithubLink(String githubLink) {
        this.githubLink = githubLink;
    }

    private String githubLink;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String userId) {
        this.username = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }
}
