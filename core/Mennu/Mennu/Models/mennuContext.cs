using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Mennu.Models
{
    public partial class mennuContext : DbContext
    {
        public mennuContext()
        {
        }

        public mennuContext(DbContextOptions<mennuContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Ingredients> Ingredients { get; set; }
        public virtual DbSet<Mealingredients> Mealingredients { get; set; }
        public virtual DbSet<Mealplans> Mealplans { get; set; }
        public virtual DbSet<Meals> Meals { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=mennu;password=a;database=mennu");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<Ingredients>(entity =>
            {
                entity.ToTable("ingredients", "mennu");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(36)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Measurement)
                    .HasColumnName("measurement")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(1000)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Mealingredients>(entity =>
            {
                entity.ToTable("mealingredients", "mennu");

                entity.HasIndex(e => e.IngredientId)
                    .HasName("ingredient_idx");

                entity.HasIndex(e => e.MealId)
                    .HasName("mealmealingredients_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(36)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Amount)
                    .HasColumnName("amount")
                    .HasMaxLength(45)
                    .IsUnicode(false);

                entity.Property(e => e.IngredientId)
                    .IsRequired()
                    .HasColumnName("ingredientId")
                    .HasMaxLength(36)
                    .IsUnicode(false);

                entity.Property(e => e.MealId)
                    .IsRequired()
                    .HasColumnName("mealId")
                    .HasMaxLength(36)
                    .IsUnicode(false);

                entity.HasOne(d => d.Ingredient)
                    .WithMany(p => p.Mealingredients)
                    .HasForeignKey(d => d.IngredientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ingredient");

                entity.HasOne(d => d.Meal)
                    .WithMany(p => p.Mealingredients)
                    .HasForeignKey(d => d.MealId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("meal");
            });

            modelBuilder.Entity<Mealplans>(entity =>
            {
                entity.ToTable("mealplans", "mennu");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(36)
                    .IsUnicode(false)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<Meals>(entity =>
            {
                entity.ToTable("meals", "mennu");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(36)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Instructions)
                    .HasColumnName("instructions")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Servings)
                    .HasColumnName("servings")
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("0");
            });
        }
    }
}
