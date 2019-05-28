package painter;

import java.awt.Graphics2D;
import java.util.ArrayList;

public class Flag extends CompositeShape {
	
		public int x1,y1,height,width;
		public int[][] point=new int[4][2];
		public int radius;
		public int cx,cy;
		
		ArrayList<IShape> shapes=new ArrayList<>();
		public Flag(int x1,int y1,int height,int width) {
			
			this.x1=x1;
			this.y1=y1;
			this.height=height;
			this.width=width;
			
			
			
			radius=width/5;
			System.out.println(radius);
			cx=(int)((9.0/20.0)*width)+x1-radius;
			cy=(height/2)+y1-radius;
			
			point[0][0]=x1;
			point[0][1]=y1;
			
			point[1][0]=x1+width;
			point[1][1]=y1;
			
			point[2][0]=x1+width;
			point[2][1]=y1+height;
			
			point[3][0]=x1;
			point[3][1]=y1+height;
			
			
			
		}
		@Override
		public void buildShape() {
			
			shapes.add(new Rectangle(point));
			shapes.add(new Circle(cx,cy,radius));
		}
		
		@Override
		public void draw(Graphics2D g2d) {
				
			buildShape();
			for(IShape shape:shapes) {
				
				shape.draw(g2d);
			}
		}
}
