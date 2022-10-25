package com.ahaideas.ideasapi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
public class VoteCount {

    public VoteCount(int count) {
        this.count = count;
    }
    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    private int count;


}
